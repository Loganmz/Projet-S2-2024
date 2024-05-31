<script setup lang="ts">
//
</script>

<template>
  <section>
    <h3>13 fev</h3>
    <h2>Comment vous santez-vous aujourd'hui ?</h2>
    <div class="grid grid-cols-4">
        <div>
            <RouterLink to="#">
                <img src="/public/img/good.jpg" alt="emoji Good" />
                <p>Très bien</p>
            </RouterLink>
        </div>
        <div>
            <RouterLink to="#">
                <img src="/public/img/imok.jpg" alt="emoji im ok" />
                <p>Bien</p>
            </RouterLink>
        </div>
        <div>
            <RouterLink to="#">
                <img src="/public/img/better.jpg" alt="could be better" />
                <p>Cela pourrait aller mieux</p>
            </RouterLink>
        </div>
        <div>
            <RouterLink to="#">
                <img src="/public/img/notgood.jpg" alt="emoji not good" />
                <p>Pas bien</p>
            </RouterLink>
        </div>
    </div>
  </section>
  <section>
    <h2>Recommandation</h2>
    <div class="grid grid-cols-2">
    <div>
        <RouterLink to="#">
                <img src="/public\img\session-calme.jpg" alt="photo session calme" class="p-4 rounded shadow  "/>
                <p>session calme</p>
            </RouterLink>
    </div>
    <div>
        <RouterLink to="#">
                <img src="/public\img\voir-un-souvenirs.jpg" alt="photo voir un souvenirs" class="p-4 rounded shadow  " />
                <p>Voir un souvenirs</p>
            </RouterLink>
    </div>
    <div>
        <RouterLink to="#">
                <img src="/public\img\citation_photo.jpg" alt="citation inspirante" class="p-4  rounded shadow " />
                <p>Citation inspirante</p>
            </RouterLink>
    </div>
    </div>
  </section>
</template>
