<!--
    趋势分布图表
    生成一个趋势分布图表，包含标题和主体部分，主体部分由行和列组成，行和列之间通过线连接起来。
    鼠标移入行或列时，会高亮该行的所有列或列的所有行，鼠标移出时，恢复原状。

    @author XW
    @param colMargin: 行间距
    @param rowMargin: 列间距
    @param cellWidth: 单元格宽度
    @param cellHeight: 单元格高度
    @method draw {function} 调用方法，图表数据格式：[{ year: '', keywords: [''] }]，year为标题，keywords为图表内容
-->
<template>
    <div class="chart-container">
        <!-- title -->
        <div
            class="row header"
            :style="{
                marginBottom: `${rowMargin}px`,
            }"
        >
            <div
                v-for="(text, colIndex) in header"
                :key="`${colIndex}`"
                :style="{
                    width: `${cellWidth}px`,
                    height: `${cellHeight}px`,
                    marginRight: `${colMargin}px`
                }"
                class="cell"
            >
                {{ text }}
            </div>
        </div>
        <!-- body -->
        <div
            v-for="(row, rowIndex) in inputData"
            :key="rowIndex"
            class="row"
            :style="{ marginBottom: `${rowMargin}px` }"
        >
            <div
                v-for="(text, colIndex) in row"
                :key="`${rowIndex}-${colIndex}`"
                :style="{
                    backgroundColor: getBackgroundColor(rowIndex, colIndex),
                    opacity: text === ''? 0 : 1,
                    width: `${cellWidth}px`,
                    height: `${cellHeight}px`,
                    marginRight: `${colMargin}px`
                }"
                :class="{ 'highlighted': isHighlighted(rowIndex, colIndex), 'faded': isFaded(rowIndex, colIndex) }"
                class="cell"
                @mouseenter="text !== '' && highlightConnectedChain(rowIndex, colIndex)"
                @mouseleave="text !== '' && resetHighlight()"
            >
                {{ text }}
            </div>
        </div>
        <!-- line -->
        <div
            v-for="(line, lineIndex) in connectionLines"
            :key="lineIndex"
            :style="{
                left: `${line.startX}px`,
                top: `${line.startY}px`,
                width: `${line.length}px`,
                transform: `rotate(${line.angle}deg)`,
                opacity: isLineVisible(lineIndex)? 1 : 0
            }"
            class="connection-line"
        ></div>
    </div>
</template>

<script>
const chartData = [
    {
        year: "2020",
        keywords: ['A1','A2','A3','A4','A5','A6','A7','A8','A9','A10','A11','A12','A13','A14','A15','A16','A17','A18','A19','A20'],
    },
    {
        year: "2021",
        keywords: ['B1','A2','B3','B4','B5','B6','B7','B8','B9','B10','B11','B12','B13','B14','B15','B16','B17','B18'],
    },
    {
        year: "2022",
        keywords: ['C1','C2','A2','C4','C5','C6','C7','C8','C9','C10','C11','C12','C13','C14','C15','C16','C17','C18','B18'],
    },
    {
        year: "2023",
        keywords: ['D1','D2','D2','D4','D5','D6','D7','D8','D9','D10','D11','D12','D13','D14','D15','D16','D17','D18','D18','D19','D20'],
    },
    {
        year: "2024",
        keywords: ['E1','A2','E2','E4','E5','E6','E7','E8','E9','E10','E11','E12','E13','E14','E15','E16','E17','E18','E18','E19','E20'],
    },
];

export default {
    name: "TrendsChart",
    props: {
        // 图表数据
        chartData: {
            type: Array,
            default: () => []
        },
        // 单元格宽度
        cellWidth: {
            type: Number,
            default: 115
        },
        // 单元格高度
        cellHeight: {
            type: Number,
            default: 24
        },
        // 行间距
        colMargin: {
            type: Number,
            default: 35
        },
        // 列间距
        rowMargin: {
            type: Number,
            default: 12
        }
    },
    data() {
        return {
            // 图表数据
            header: [],
            inputData: [],
            // 连接线
            connectionLines: [],
            // 高亮
            highlightedCells: [],
            highlightedLines: [],
            // 单元格与连接线的映射
            cellLineMap: {},
            // 颜色映射
            colorMap: [
                ['#F39192', '#D8EE93', '#354756', '#C2DBDE', '#196B69'],
                ['#E6DFD7', '#6AE4DB', '#344151', '#AACDCC', '#28CC9E'],
                ['#838DD8', '#69C7FA', '#F65840', '#7FA1A1', '#BAE4C3'],
                ['#657BC1', '#8D9EE3', '#383430', '#79C6F7', '#FF8B8B'],
                ['#060508', '#F2D5D6', '#F2DFC5', '#75E2FF', '#FF5151'],
                ['#23709F', '#FF8484', '#29CCB5', '#D9DE58', '#0F4392'],
                ['#A695C6', '#FE5656', '#9AF2D2', '#FE8EE3', '#000249'],
                ['#F7D1CC', '#FE007A', '#800074', '#466C95', '#1BB5EC'],
                ['#503A5B', '#ECE485', '#BF38B3', '#5DAE8B', '#4DF4FF'],
                ['#C9A2DF', '#3FC3D2', '#DEACDA', '#E7E59E', '#D3DBAB'],
                ['#FFC0E7', '#0AA7F8', '#EDDCB7', '#FF7676', '#FF5AB0'],
                ['#F5D7E7', '#626DED', '#5629B3', '#3A0077', '#E5D3D3'],
                ['#FF5C6D', '#DFD6D6', '#CA99F5', '#8983F3', '#3AB1C8'],
                ['#2EB772', '#EC7738', '#DBC6EB', '#A5F2E7', '#2772DB'],
                ['#A2DC81', '#2C3E4E', '#E1E8AC', '#E7DDA1', '#070F4E'],
                ['#E9EDBF', '#35485D', '#A6CE29', '#520556', '#8D6EC8'],
                ['#F9DA72', '#891080', '#616E3A', '#8B104E', '#88A6E5'],
                ['#90CCFF', '#CA22D6', '#3F422F', '#CA431D', '#A6DFDE'],
                ['#0160C8', '#ECA0E9', '#000000', '#FF9900', '#CADFCB'],
                ['#09008A', '#EED8D6', '#C1E7E8', '#132F2B', '#FF5722']
            ],
        };
    },
    watch: {
        chartData: {
            handler() {
                this.draw(this.chartData);
            },
            immediate: true
        }
    },
    methods: {
        /**
         * 将输入数据转换为图表所需的格式
         * @param {Array} inputData 输入数据，格式为[{ year: string, keywords: string[] }]
         * @returns {Object} 返回转换后的数据，包含header和body两个属性
         *                  header: 年份数组
         *                  body: 关键词矩阵，每行代表一个时间点的关键词集合
         */
        convertData(inputData) {
            const headers = [];
            const body = [];
            let maxKeywords = 0;

            // 提取年份作为 header
            for (let item of inputData) {
                headers.push(item.year);
                maxKeywords = Math.max(maxKeywords, item.keywords.length);
            }

            // 构建 body
            for (let i = 0; i < maxKeywords; i++) {
                const row = [];
                for (let item of inputData) {
                    if (i < item.keywords.length) {
                        row.push(item.keywords[i]);
                    } else {
                        row.push("");
                    }
                }
                body.push(row);
            }

            // 确保 body 长度为 20
            while (body.length < 20) {
                body.push(Array(headers.length).fill(""));
            }

            // 截取 body 为 20
            body.length = 20;

            // 确保 body 子元素长度为 5
            for (let i = 0; i < body.length; i++) {
                while (body[i].length < 5) {
                    body[i].push("");
                }
                body[i].length = 5;
            }

            const output = {
                header: headers,
                body: body
            };
            return output;
        },
        /**
         * 绘制趋势图表
         * @param {Array} data 图表数据，格式为[{ year: string, keywords: string[] }]
         */
        draw(data) {
            const {header, body} = this.convertData(data);
            this.inputData = body;
            this.header = header;
            this.calculateConnectionLines();
            this.$emit('chart-ready');
        },
        /**
         * 获取单元格背景色
         * @param {number} rowIndex 行索引
         * @param {number} colIndex 列索引
         * @returns {string} 返回颜色值
         */
        getBackgroundColor(rowIndex, colIndex) {
            return this.colorMap[rowIndex][colIndex];
        },
        /**
         * 计算关键词之间的连接线
         * 遍历相邻列之间的单元格，如果存在相同的关键词，则在它们之间绘制连接线
         * 连接线的位置和角度通过单元格的位置计算得出
         */
        calculateConnectionLines() {
            const lines = [];
            const rowCount = this.inputData.length;
            const colCount = this.inputData[0].length;

            for (let col = 0; col < colCount - 1; col++) {
                for (let row = 0; row < rowCount; row++) {
                    if (col >= this.inputData[row].length || this.inputData[row][col] === '') continue;
                    const currentText = this.inputData[row][col];
                    for (let nextRow = 0; nextRow < rowCount; nextRow++) {
                        if (
                            col + 1 < this.inputData[nextRow].length &&
                            this.inputData[nextRow][col + 1] !== '' &&
                            this.inputData[nextRow][col + 1] === currentText
                        ) {
                            const headerHeight = this.cellHeight + this.rowMargin;
                            const startX = (col + 1) * this.cellWidth + col * this.colMargin;
                            const startY = row * (this.cellHeight + this.rowMargin) + (this.cellHeight / 2) + headerHeight;
                            const endX = startX + this.colMargin;
                            const endY = startY + (nextRow - row) * (this.cellHeight + this.rowMargin);

                            const dx = endX - startX;
                            const dy = endY - startY;
                            const length = Math.sqrt(dx * dx + dy * dy);
                            const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

                            const lineIndex = lines.length;
                            lines.push({startX, startY, length, angle, start: [row, col], end: [nextRow, col + 1]});

                            const startKey = `${row}-${col}`;
                            const endKey = `${nextRow}-${col + 1}`;
                            if (!this.cellLineMap[startKey]) this.cellLineMap[startKey] = [];
                            if (!this.cellLineMap[endKey]) this.cellLineMap[endKey] = [];
                            this.cellLineMap[startKey].push(lineIndex);
                            this.cellLineMap[endKey].push(lineIndex);
                        }
                    }
                }
            }
            this.connectionLines = lines;
        },
        /**
         * 深度优先搜索算法，用于查找同一关键词的所有连接节点
         * @param {Array} node 当前节点的坐标 [row, col]
         * @param {Set} visited 已访问节点的集合
         */
        dfs(node, visited) {
            const key = `${node[0]}-${node[1]}`;
            if (visited.has(key)) return;
            visited.add(key);
            const connectedLines = this.cellLineMap[key] || [];
            connectedLines.forEach(lineIndex => {
                const line = this.connectionLines[lineIndex];
                const nextNode1 = line.start;
                const nextNode2 = line.end;
                this.dfs(nextNode1, visited);
                this.dfs(nextNode2, visited);
                this.highlightedLines.push(lineIndex);
            });
        },
        /**
         * 高亮显示关键词连接链
         * 当鼠标移入某个关键词时，高亮显示该关键词在不同时间点的所有出现位置及其连接线
         * @param {number} rowIndex 当前单元格的行索引
         * @param {number} colIndex 当前单元格的列索引
         */
        highlightConnectedChain(rowIndex, colIndex) {
            const visited = new Set();
            this.highlightedLines = [];
            const targetText = this.inputData[rowIndex][colIndex];
            for (let row = 0; row < this.inputData.length; row++) {
                for (let col = 0; col < this.inputData[row].length; col++) {
                    if (this.inputData[row][col] === targetText) {
                        this.dfs([row, col], visited);
                    }
                }
            }
            this.highlightedCells = Array.from(visited);
        },
        /**
         * 重置高亮状态
         * 清除所有高亮的单元格和连接线
         */
        resetHighlight() {
            this.highlightedCells = [];
            this.highlightedLines = [];
        },
        /**
         * 判断指定单元格是否处于高亮状态
         * @param {number} rowIndex 行索引
         * @param {number} colIndex 列索引
         * @returns {boolean} 返回是否高亮
         */
        isHighlighted(rowIndex, colIndex) {
            const key = `${rowIndex}-${colIndex}`;
            return this.highlightedCells.includes(key);
        },
        /**
         * 判断指定单元格是否需要淡化显示
         * 当有高亮单元格时，非高亮单元格会被淡化显示
         * @param {number} rowIndex 行索引
         * @param {number} colIndex 列索引
         * @returns {boolean} 返回是否淡化
         */
        isFaded(rowIndex, colIndex) {
            return this.highlightedCells.length > 0 && !this.isHighlighted(rowIndex, colIndex);
        },
        /**
         * 判断指定连接线是否可见
         * @param {number} lineIndex 连接线索引
         * @returns {boolean} 返回连接线是否可见
         */
        isLineVisible(lineIndex) {
            if (this.highlightedCells.length === 0) {
                return true; // 没有高亮单元格时展示所有线条
            }
            if (this.highlightedCells.length === 1) {
                return false; // 只有一个高亮单元格时隐藏所有线条
            }
            return this.highlightedLines.includes(lineIndex);
        }
    },
};
</script>

<style scoped>
.chart-container {
    position: relative;
    display: flex;
    flex-direction: column;
}

.row {
    display: flex;
}

.row.header .cell {
    color: #3E3F43;
    background-color: #E7E7E8;
}

.cell {
    width: 50px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    color: #FFFFFF;
    font-family: Microsoft YaHei UI;
    font-size: 12px;
    line-height: 15px;
    z-index: 1;
    cursor: default;
}

.cell:last-child {
    margin-right: 0 !important;
}

.cell.highlighted {
}

.cell.faded {
    background: #E7E7E8 !important;
}

.connection-line {
    position: absolute;
    height: 2px;
    background-color: #3e3f43;
    transform-origin: top left;
    transition: all 0.3s;
}
</style>
