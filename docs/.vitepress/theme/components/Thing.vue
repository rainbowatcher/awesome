<script setup lang="ts">
import { useData } from 'vitepress';
import { computed, useSlots } from 'vue';
import 'iconify-icon';

const props = defineProps<{
    icon?: string
    name: string
    link?: string
    badges?: string
    desc?: string
}>()

const _icon = computed(() => `simple-icons:${props.icon ?? 'github'}`)
const { isDark } = useData()
const color = computed(() => {
    return isDark.value ? "#fafafa" : "#283636"
})

const badgeImgSrcArr = props.badges?.includes(";") ? props.badges.split(";") : [props.badges]
const slots = useSlots()
</script>

<template>
    <section class="thing-wrapper">
        <div class="thing-header">
            <a :href="link" target="__blank" :class="desc ? 'hint--top-right hint--rounded hint--medium' : ''" :aria-label="desc">
                <iconify-icon :icon="_icon" height="1.5rem" :style="{ color }"></iconify-icon>
                {{ name }}
            </a>
            <div v-if="badges" class="thing-header-extra">
                <img v-for="src in badgeImgSrcArr" :src="src" alt="badge" loading="lazy">
            </div>
        </div>

        <div v-if="slots.default" class="thing-content">
            <slot />
        </div>
    </section>
</template>

<style scoped>
.thing-wrapper {
    max-width: 100%;
    max-height: 140px;
    height: 100%;
    padding: .6rem 1rem;
    border-radius: .6rem;
    background-color: rgba(200, 200, 200, 0.08);
    outline: 1px solid rgba(135, 135, 135, .2);
    transition: all .3s linear;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
}

.thing-wrapper:hover {
    outline: 3px solid rgba(65, 255, 227, 0.4);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.06),
        0px 6px 12px rgba(0, 0, 0, 0.12),
        0 0 0 1px rgba(255, 255, 255, 0.08);
    /* background-color: rgba(88, 201, 150, 0.4); */
}

.thing-header {
    display: flex;
    align-items: center;
    height: fit-content;
}

.thing-header>a {
    display: flex;
    align-items: center;
    gap: .6rem;
}

.thing-header-extra {
    margin-left: auto;
    display: flex;
    flex-wrap: wrap;
    padding-left: .4rem;
    gap: 0 .2rem;
}

.thing-title {
    font-size: large;
    font-weight: 600;
    line-height: .8rem !important;
}

.thing-content {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1rem !important;
    margin: 0 0 .4rem 0 !important;
}

.thing-content :deep(p) {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.45rem !important;
    margin: 0 0 .4rem 0 !important;
}

[class*="hint--"][aria-label]::after {
    font-size: medium;
}
</style>