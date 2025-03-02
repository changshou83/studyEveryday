<!--
    AI资讯概览
    @author XW
-->
<template>
    <div class="ai-news-general-view-container">
        <div class="generate-loading-container" v-show="loading">
            <div class="generation-loading">
                <div class="backgroundElement"></div>
            </div>
        </div>
        <div v-show="!loading" id="ai-news-general-view-content-container" v-html="content"></div>
    </div>
</template>

<script>
export const GenerateContentMixin = {
    methods: {
        /**
         * 生成并展示概览内容
         */
        async showAINewsContent(item) {
            // TODO
            const ref = this.$refs.GeneralView;
            // 是否已有内容
            const [hasContent, content] = this.hasAINewsContent(item);
            // 更新文本
            if(hasContent) {
                // 开启打字效果
                this.$nextTick(async () => {
                    const printPromise = ref.startPrint();
                    ref.update(true, content);
                    await printPromise;
                });
            } else {
                const stopLoading = await ref.startLoading(true);
                // 开启打字效果
                const printPromise = ref.startPrint();
                const [data,err] = await this.generateContent((done, updateStr) => {
                    ref.update(done, updateStr);
                }, {});
                if(err){
                    ref.loading && stopLoading();
                    if(err.code === 500){
                        this.$api.alert({msg:err.msg,type:'error'});
                    }else{
                        // 这里会报错
                        checkCode({code: err.code, isHandleErrors: true,});
                    }
                } else {
                    // 如果没有报错，则等待打字效果完成
                    await printPromise;
                    return data;
                }
            }
        },
        // TODO
        hasAINewsContent(item) {
            if (item.information_summary) {
                return [true, item.information_summary];
            } else {
                return [false, ''];
            }
        },
        async generateContent(iteration, params) {
            const MAX_RETRIES = 20;

            // 封装请求逻辑
            async function makeRequest() {
                let answerLen = 0;
                const {data} = await this.$axios.post(
                    '',
                    params,
                    {
                        onDownloadProgress: (progressEvent) => {
                            let isEnd = false;
                            let res = progressEvent.target.response || '';
                            let resArr = res.split('<<=-aichat-medpeer-=>>')
                                .map((t) => {
                                    try {
                                        const item = JSON.parse(t || null);
                                        if (item && item.tag === 'end') isEnd = true;
                                        return item;
                                    } catch (e) {
                                        console.log(e);
                                    }
                                })
                                .filter(t => t && t.tag === 'continue')
                                .map(t => t.output_content[0]);

                            // 获取全部增量数据
                            resArr = resArr.splice(answerLen);
                            // 更新已处理文本长度
                            answerLen += resArr.length;
                            // 执行回调
                            iteration && iteration(isEnd, resArr.join(''));
                        },
                    }
                );

                const resArr = data.split('<<=-aichat-medpeer-=>>');
                return JSON.parse(resArr[resArr.length - 1] || '{}');
            }

            let retries = 0;
            while (retries < MAX_RETRIES) {
                try {
                    const responseData = await makeRequest.call(this);
                    if (responseData.code === 200) {
                        return [responseData, null];
                    } else {
                        retries++;
                        if (retries >= MAX_RETRIES) {
                            return [null, responseData || '连接失败'];
                        }
                    }
                } catch (error) {
                    retries++;
                    if (retries >= MAX_RETRIES) {
                        if (error?.response?.status === 502 || error?.response?.status === 504) {
                            return [null, '模型未响应'];
                        }
                        return [null, error.message || '连接失败'];
                    }
                    await new Promise((resolve) => setTimeout(resolve, 10));
                }
            }
        }
    },
};

export default {
    name: "AINewsGeneralView",
    data() {
        return {
            loading: false,
            //打印
            print:{
                isAddPrintOver:false,
                // 文本缓存池
                printPool: '',
                // 是否正在打印
                isPrinting:false,
                printInterval: null,
            },
            content: '',
            resolver: null,
        };
    },
    methods: {
        setContent(content) {
            this.content = content;
        },
        /**
         * 重置状态
         */
        reset() {
            this.content = '';
            this.resolver = null;
            this.loading = false;
            this.print = {
                isAddPrintOver:false,
                isPrinting:false,
                printPool:'',
            };
        },
        update(done, updateStr) {
            if(this.loading) this.loading = false;
            // 添加待逐一渲染的文本
            this.addPrint(updateStr);
            // 标记文本添加完毕
            done && this.addPrintOver();
            console.timeEnd('update')
        },
        /**
         * 设置loading状态
         */
        async startLoading() {
            this.loading = true;

            return () => {
                this.loading = false;
            };
        },
        /**
         * 开始打字效果
         */
        startPrint() {
            return new Promise(res => {
                const t = this.print;
                t.isPrinting = true; // 控制标志，初始值为 true

                t.printInterval = setInterval(() => {
                    if(!this.resolver) this.resolver = res;

                    // 如果文本池为空，不处理
                    if (!t.printPool.length) {
                        // 如果文本池为空且已标记添加打字文本结束，则停止打字效果
                        this.stopPrint();
                        return;
                    }

                    // 将生成的文本赋值给对应的段落
                    if(this.content) {
                        this.content += t.printPool.slice(0, 8);
                    } else {
                        this.content = t.printPool.slice(0, 8);
                    }
                    // 缩减文本池
                    t.printPool = t.printPool.slice(8);
                }, 16.6);
            });
        },
        /**
         * 停止打字效果
         */
        stopPrint() {
            clearInterval(this.print.printInterval);
            this.print.printInterval = null;
            this.print.printPool = '';
            this.print.isAddPrintOver = false;
            this.print.isPrinting = false;
            this.resolver?.();
        },
        /**
         * 添加需打字文本结束
         */
        addPrintOver() {
            this.print.isAddPrintOver = true;
        },
        /**
         * 添加需打字文本
         * @param text
         */
        addPrint(text) {
            const t = this.print;

            if (t.isAddPrintOver) return;
            t.printPool += text;

            t.printInterval === null && this.startPrint();
        },
    }
}
</script>

<style scoped lang="scss">
.ai-news-general-view-container {
    width: 100%;
    height: 100%;
    min-height: 50px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.generate-loading-container {
    position: relative;
    height: 100%;
    width: 100%;
}
.generate-loading-container .generation-loading{
    user-select: none;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);

    width: 94px;
    height: 56px;
    background: transparent;
    z-index: 111111;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
}
.generate-loading-container .backgroundElement {
    width: 64px;
    height: 20px;
    background-size: cover;
    background-position: center;
    animation: changeBackground 500ms infinite;
}
.generate-loading-container .generation_text{
    color: #6B6C70;
    font-size: 16px;
    line-height: 20px;
}
@keyframes changeBackground {
    0%   { background-image: url('@asset/img/show/news_information/loading/loding1.svg'); }
    14%  { background-image: url('@asset/img/show/news_information/loading/loding2.svg'); }
    29%  { background-image: url('@asset/img/show/news_information/loading/loding3.svg'); }
    43%  { background-image: url('@asset/img/show/news_information/loading/loding4.svg'); }
    57%  { background-image: url('@asset/img/show/news_information/loading/loding5.svg'); }
    71%  { background-image: url('@asset/img/show/news_information/loading/loding6.svg'); }
    86%  { background-image: url('@asset/img/show/news_information/loading/loding7.svg'); }
    100% { background-image: url('@asset/img/show/news_information/loading/loding1.svg'); }
}
</style>
