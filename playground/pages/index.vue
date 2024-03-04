<template>
    <div class="landing">
        <div class="cards">
            <div v-for="(card, index) in cards.slice(0, 4)" :key="index" class="card">
                <NuxtLink :to="card.path" class="card__content">
                    <img v-if="card.image" :src="card.image" :alt="card.title" class="card__image" />
                    <span v-else class="card__title">{{ card.title }}</span>
                </NuxtLink>
            </div>

            <div class="landing__title">
                <span>Zenith</span>
                <span>Playground</span>
            </div>

            <div v-for="(card, index) in cards.slice(4)" :key="index" class="card">
                <NuxtLink :to="card.path" class="card__content">
                    <img v-if="card.image" :src="card.image" :alt="card.title" class="card__image" />
                    <span v-else class="card__title">{{ card.title }}</span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
const cards = [
    { title: '2D', path: '/2d', image: '' },
    { title: '3D', path: '/3d', image: '' },
    { title: 'Particles', path: '/particles', image: '/web/images/card-particles.jpg' },
    { title: '', path: '/', image: '' },
    { title: '', path: '/', image: '' },
    { title: '', path: '/', image: '' },
    { title: '', path: '/', image: '' },
    { title: '', path: '/', image: '' },
]
</script>

<style lang="scss">
.landing {
    background-color: #0a0a0a;
    width: 100%;
    height: 100vh;
    padding-top: max(15vh, 100px);

    .landing__title {
        display: grid;
        place-items: center;
        widht: 100%;
        height: 100px;
        font-size: 3rem;
        color: #ccc;
        user-select: none;
        transition: all 0.3s;

        &:hover {
            transform: scale(1.1) rotate(-10deg);
        }

        > span:last-child:after {
            content: '';
            display: block;
            width: 0;
            height: 3px;
            background-color: rgba(255, 255, 255, 0.5);
            margin-top: 0px;
            margin-left: 50%;
            transition: all 0.3s;
            border-radius: 5px;
        }

        &:hover > span:last-child:after {
            width: 110%;
            margin-left: -5%;
        }
    }

    .cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-content: center;
        align-items: center;
        width: min-content;
        margin: 0 auto;
    }

    .card {
        width: 300px;
        height: 300px;
        background-color: #333;
        margin: 10px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        transition: all 0.3s;

        &:hover:nth-child(2n) {
            transform: scale(1.05) rotate(3deg);
        }
        &:hover:nth-child(2n+1) {
            transform: scale(1.05) rotate(-3deg);
        }

        .card__content {
            width: 100%;
            height: 100%;
            display: grid;
            place-items: center;
            text-decoration: none;
            color: #fff;
        }

        .card__title {
            font-size: 2rem;
            opacity: 0.5;
            transition: all 0.3s;
        }
        &:hover:nth-child(2n) .card__title {
            transform: scale(1.2) rotate(-3deg);
            opacity: 1;
        }
        &:hover:nth-child(2n+1) .card__title {
            transform: scale(1.2) rotate(3deg);
            opacity: 1;
        }

        .card__image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.3s;
        }
    }
}
</style>
