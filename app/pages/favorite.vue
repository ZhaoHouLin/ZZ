<script setup>
// 舊網址轉址到一頁式的錨點（docs/ONEPAGE-3D.md Q5）；預渲染的靜態頁靠 meta refresh，站內導覽靠 navigateTo
const base = useRuntimeConfig().app.baseURL
useHead({ meta: [{ "http-equiv": "refresh", content: `0;url=${base}#mountain` }] })
onMounted(() => navigateTo("/#mountain", { replace: true }))
</script>

<template lang="pug">
.redirect
</template>
