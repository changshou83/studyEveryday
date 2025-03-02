<!--
    播放音频文件
    @author XW
    @param file 要播放的文件url
    @param width 容器宽度，默认516px
-->
<template>
    <div class="play-audio-container" :style="{ width: width + 'px' }" @click.stop>
        <audio
            id="audio"
            ref="audio"
            :src="audioSrc"
            @canplay="updateDuration()"
            @ended="clearAudio()"
        ></audio>
        <!--播放与暂停按钮-->
        <div class="control-button" @click="handleClickControlButton">
            <img v-if="this.status === AUDIO_STATUS.PAUSED" src="@asset/img/enter/voxlitera/component/pause.svg" alt="" />
            <img v-else src="@asset/img/enter/voxlitera/component/play.svg" alt="" />
        </div>
        <!--当前播放时长-->
        <div class="current-time">{{currentTime}}</div>
        <!--进度条-->
        <div class="progress-container" @click="handleChangeCurrent" ref="progressContainer">
            <div id="progressBar" :style="{ width: `${percentage}%` }">
                <div id="progressThumb" :style="{ right: `calc(100% - ${percentage}%)` }"></div>
            </div>
        </div>
        <!--音频播放总时长-->
        <div class="total-time">{{allTime}}</div>
    </div>
</template>

<script>
// 播放状态枚举
const AUDIO_STATUS = Object.freeze({
    PLAYING: 'playing',
    PAUSED: 'paused'
});

// 格式化时间函数，格式为 MM:SS
function formatTime(timeInSeconds) {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = Math.floor(timeInSeconds % 60);

    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    return `${minutes}:${seconds}`;
}

export default {
    name: "PlayAudio",
    props: {
        // 音频文件URL
        file: {
            type: [String, Object],
            default: ''
        },
        // 容器宽度
        width: {
            type: Number,
            default: 516
        }
    },
    data() {
        return {
            AUDIO_STATUS,
            // 当前播放状态，用于控制播放按钮的图标
            status: AUDIO_STATUS.PAUSED,
            // 当前播放时长
            current: 0,
            // 播放总时长
            duration: 0,
            // 音频文件url
            audioSrc: '',
        }
    },
    computed: {
        /**
         * 格式化后的当前播放时间
         * @returns {string}
         */
        currentTime() {
            return formatTime(this.current);
        },
        /**
         * 格式化后的播放总时长
         * @returns {string}
         */
        allTime() {
            return formatTime(this.duration);
        },
        /**
         * 播放进度 %
         * @returns {number|number}
         */
        percentage() {
            return this.duration > 0 ? (this.current / this.duration) * 100 : 0;
        }
    },
    watch: {
        /**
         * 监听file的变化，动态加载音频文件
         * @param val
         */
        file(val) {
            this.loadFile(val);
        }
    },
    mounted() {
        this.loadFile(this.file);
        this.$refs.audio.addEventListener('timeupdate', this.updateProgress);
        this.$refs.audio.addEventListener('loadedmetadata', this.updateDuration);
    },
    beforeDestroy() {
        this.$refs.audio.removeEventListener('timeupdate', this.updateProgress);
        this.$refs.audio.removeEventListener('loadedmetadata', this.updateDuration);
    },
    methods: {
        /**
         * 加载音频文件
         * @param val
         */
        loadFile(val) {
            this.audioSrc = val;
            this.$refs.audio.load();
        },
        /**
         * 处理进度条点击事件，支持切换当前播放进度
         * @param e
         */
        handleChangeCurrent(e) {
            const clickX = e.offsetX;
            const containerWidth = this.$refs.progressContainer.clientWidth;
            this.$refs.audio.currentTime = (clickX / containerWidth) * this.$refs.audio.duration;
        },
        /**
         * 更新当前播放时长
         */
        updateProgress() {
            this.current = this.$refs.audio.currentTime;
        },
        /**
         * 更新播放总时长
         */
        updateDuration() {
            this.duration = this.$refs.audio.duration;
        },
        /**
         * 处理控制按钮点击事件
         */
        handleClickControlButton() {
            try {
                const audio = this.$refs.audio;
                if (audio.paused) {
                    audio.play();
                    this.status = AUDIO_STATUS.PLAYING;
                } else {
                    audio.pause();
                    this.status = AUDIO_STATUS.PAUSED;
                }
            } catch(e) {
                console.error(e);
            }
        },
        /**
         * 音频播放完毕后重置状态
         */
        clearAudio() {
            this.$refs.audio.currentTime = 0;
            this.current = 0;
            this.status = AUDIO_STATUS.PAUSED;
        }
    }
}
</script>

<style scoped lang="scss">
.play-audio-container {
    width: 100%;
    height: 100%;
    border: 1px solid #E7E7E8;
    border-radius: 4px;
    padding: 8px 16px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #2F81A8;
}
// 控制按钮
.control-button {
    cursor: pointer;
    display: flex;
    align-items: center;
    img {
        width: 24px;
        height: 24px;
    }
}
// 时间
.total-time,
.current-time {
    font-size: 14px;
    color: #3E3F43;
}
.current-time {
    color: #3E3F43;
    margin-left: 16px;
}
// 进度条
.progress-container {
    flex: 1;
    height: 2px;
    background-color: #DCDCDC;
    margin: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
}
#progressBar {
    height: 100%;
    width: 0;
    background-color: #009ADA;
    border-radius: 5px;
}
#progressThumb {
    position: absolute;
    top: 1px;
    right: 0;
    transform: translate(50%, -50%);
    width: 8px;
    height: 8px;
    background-color: #009ADA;
    border-radius: 50%;
    cursor: pointer;
}
</style>
