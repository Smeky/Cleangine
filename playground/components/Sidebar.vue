<template>
    <div class="zenith-sidebar" :class="{ 'is-active': props.open }">
        <div class="zenith-sidebar--burger" @click.stop.prevent="onBurgerClick">
            <img src="/web/burger.svg" alt="Otevřít menu" />
        </div>

        <!-- <Transition name="fade-inout"> -->
            <div class="zenith-sidebar--content">
                <ul class="zenith-sidebar--list">
                    <li
                        v-for="item in navItems"
                        :key="item.path"
                        class="zenith-sidebar--item"
                    >
                        <NuxtLink :to="item.path" class="zenith-sidebar--link">
                            {{ item.label }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        <!-- </Transition> -->
    </div>
</template>

<script setup>
const emits = defineEmits(['open', 'close'])
const props = defineProps({
    open: {
        type: Boolean,
        required: true
    }
})

const navItems = [
    { label: '3D', path: '/' },
    { label: '2D', path: '/2d' },
    { label: 'P', path: '/particles' },
]

const onBurgerClick = () => {
    if (!props.open)
        return emits('open')
        
    emits('close')
}
</script>

<style scoped lang="scss">
.zenith-sidebar {
    position: relative;
    height: 100vh;
    background-color: #0a0a0a;
    color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    user-select: none;
    transition: all 0.2s ease-in-out;

    $opacity-idle: 0.25;
    $opacity-hover: 0.85;

    .zenith-sidebar--burger {
        display: grid;
        place-items: center;
        border: 1px solid #fff;
        border-radius: 5px;
        width: 40px;
        height: 40px;
        margin: 5px auto 5px 5px;
        opacity: $opacity-idle;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        user-select: none;

        > * { pointer-events: none; } // Disable img dragging

        &:hover {
            opacity: $opacity-hover;
        }
    }

    .zenith-sidebar--content {
        font-size: 1rem;
    }

    .zenith-sidebar--list {
        margin-top: 2em;
        margin-left: auto;
        margin-right: auto;
    }

    .zenith-sidebar--item {
        margin-bottom: 1em;
    }

    .zenith-sidebar--link {
        color: #ecf0f1;
        display: block;
        border-radius: 4px;
        width: fit-content;
        padding: 0.7em 0.5em;
        opacity: 0.5;
        transition: all 0.2s ease-in-out;
        
        margin-left: auto;
        margin-right: auto;

        &:hover {
            opacity: 1;
        }
    }
}
</style>