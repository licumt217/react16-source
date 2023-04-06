<script setup lang="ts">
import {
    reactive,
    onMounted,
    nextTick,
    ref,
} from 'vue';


const array: any = [];
for (let i = 0; i < 10000; i++) {
    array.push({
        id: 'id' + i,
        name: '选项' + i,
        value: 'value' + i
    })
}
let limit = 600;
const arr = ref(array.slice(0, limit))

const itemSize = 31;
const getStartIndex = (scrollTop: number) => {
    return Math.floor(scrollTop / itemSize); // 这里可以思考下，为什么要用Math.floor 
};

onMounted(() => {
    const listDom: any = document.getElementById("list");
    const ulDom: any = document.getElementById("ul");
    let scrollTop = 0;
    let startIndex = 0;
    let endIndex = 0;
    let startOffset = 0;
    let timer: any = null;
    let index = 1;

    const handleScroll = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            scrollTop = listDom.scrollTop;
            // console.log("scrollTop", scrollTop)
            startIndex = getStartIndex(scrollTop)
            endIndex = startIndex + viewCount;
            startOffset = startIndex * itemSize;


            let renderEndIndex = (endIndex + limit) < array.length ? (endIndex + limit) : array.length;

            listDom?.removeEventListener('scroll', handleScroll)

            let realStartIndex = (startIndex - limit) < 0 ? 0 : (startIndex - limit);
            arr.value = array.slice(realStartIndex, renderEndIndex);

            let temp = (startIndex - realStartIndex) * itemSize
            temp = temp < 0 ? 0 : temp;

            ulDom.style.transform = `translate3d(0px,${startOffset - temp}px,0px)`
            setTimeout(() => {
                listDom?.addEventListener('scroll', handleScroll)
            })
        }, 70)
    }

    listDom?.addEventListener('scroll', handleScroll)

    const viewPort: number = listDom?.offsetHeight as number;

    const viewCount = Math.floor(viewPort / itemSize);

    endIndex = startIndex + viewCount;

})



</script>

<template>
    <div class="vl-container">
        <div class="input">
            <input type="text" placeholder="请输入" />
        </div>
        <div class="list" id="list">
            <div :style="{ height: array.length * itemSize + 'px' }"></div>
            <ul class="ul" id="ul">
                <li class="li" v-for="item in arr" :key="item.id">
                    {{ item.name }}
                </li>
            </ul>
        </div>
    </div>

    <select>
        <option v-for="item in array" :key="item.id" :value="item.value">{{ item.name }}</option>
    </select>
</template>

<style scoped lang="scss">
.vl-container {
    margin: 0 auto;
    width: 281px;
    position: relative;

    .input {
        display: block;
        box-sizing: border-box;
        outline: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
        position: relative;
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #d7dde4;
        transition: all .1s ease-in-out;

        input {
            display: inline-block;
            height: 32px;
            width: 281px;
            line-height: 32px;
            padding: 0 24px 0 8px;
            font-size: 12px;
            outline: none;
            border: none;
            box-sizing: border-box;
            color: #657180;
            background-color: transparent;
            position: relative;
            cursor: pointer;
        }
    }

    .list {
        max-height: 325px;
        width: 281px;
        transform-origin: center top;
        position: absolute;
        left: 0px;
        top: 39px;
        overflow: auto;
        overflow-x: hidden;
        border-radius: 0;
        box-shadow: 0 1px 6px rgb(0 0 0 / 33%);
        margin: 5px 0;
        padding: 5px 0;
        background-color: #fff;
        box-sizing: border-box;

        .ul {
            width: 100%;
            overflow-x: hidden;
            position: absolute;
            top: 0;
            overflow: hidden;
            overflow-x: hidden;
            background: #f4f4f6;
            margin: 0;

            .li {
                color: #b4bbc3;
                background: #f4f4f6;
                margin: 0;
                padding: 7px 16px;
                clear: both;
                color: #657180;
                font-size: 12px !important;
                white-space: nowrap;
                list-style: none;
                cursor: pointer;
                transition: background .1s ease-in-out;
            }
        }
    }
}
</style>
