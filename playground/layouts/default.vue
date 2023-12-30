<template>
    <div class="zenith-playground" :class="{ 'is-sidebar-active': isSidebarActive }">
        <div class="zenith-playground--page">
            <slot></slot>
        </div>

        <Sidebar
            class="zenith-playground--sidebar"
            :open="isSidebarActive" 
            @open="isSidebarActive = true" 
            @close="isSidebarActive = false" 
        />
    </div>
</template>

<script setup>
const isSidebarActive = ref(false)
</script>

<style lang="scss">
.zenith-playground {
    display: flex;
    flex-direction: row;
    overflow-x: hidden;

    $sidebar-width: 300px;
    $sidebar-width-collapsed: 50px;
    $transition: all 0.2s ease-in-out;

    .zenith-playground--page {
        width: calc(100% - #{$sidebar-width-collapsed});
        height: 100%;
        transition: $transition;
    }
    &.is-sidebar-active .zenith-playground--page {
        width: calc(100% - #{$sidebar-width});
    }

    .zenith-playground--sidebar {
        width: $sidebar-width-collapsed;
    }
    &.is-sidebar-active .zenith-playground--sidebar {
        width: $sidebar-width;
    }
}
</style>
