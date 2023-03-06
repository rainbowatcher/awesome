<script setup lang="ts">
import { useData } from 'vitepress';
import { computed, useSlots } from 'vue';

const props = defineProps<{
    icon?: string
    name: string
    link?: string
    author?: string
    badges?: string
    extras?: string
}>()

const { isDark } = useData()
const color = computed(() => {
    return isDark.value ? "#fafafa" : "#283636"
})

const badgeImgSrcArr = props.badges?.split(";")
const slots = useSlots()
</script>

<template>
    <section class="thing-wrapper">
        <div class="thing-header">
            <a :href="link" target="__blank">
                <component v-if="icon" :is="icon" :color="color"></component>
                <p class="thing-title">{{ name }}</p>
            </a>
            <div v-if="badges" class="thing-header-extra">
                <img v-for="src in badgeImgSrcArr" :src="src" alt="badge">
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
    padding: .4rem 1rem;
    border-radius: .6rem;
    background-color: rgba(135, 135, 135, 0.04);
    outline: 1px solid rgba(135, 135, 135, .4);
    transition: box-shadow .4s linear;
    transition: outline .4s ease;
}

.thing-wrapper:hover {
    outline: 3px solid rgba(129, 248, 198, 0.4);
    ;
    /* background-color: rgba(88, 201, 150, 0.4); */
    box-shadow: 0px 3px 6px rgba(7, 119, 69, 0.06),
        0px 6px 12px rgba(9, 130, 91, 0.12),
        0 0 0 1px rgba(255, 255, 255, 0.08);
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
</style>