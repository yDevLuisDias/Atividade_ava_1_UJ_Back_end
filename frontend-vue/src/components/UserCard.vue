<template>
  <article class="user-card" :aria-labelledby="`user-${user.id}`">
    <header>
      <h3 :id="`user-${user.id}`">{{ user.name }}</h3>
      <span class="status" :class="user.status.toLowerCase()">{{ user.status }}</span>
    </header>

    <p><strong>E-mail:</strong> {{ user.email }}</p>
    <p><strong>Curso:</strong> {{ user.course }}</p>

    <div class="progress-wrap" role="group" :aria-label="`Progresso de ${user.name}`">
      <label :for="`progress-${user.id}`">Progresso: {{ user.progress }}%</label>
      <progress :id="`progress-${user.id}`" :value="user.progress" max="100" />
    </div>

    <button type="button" @click="emit('toggle-status', user.id)">
      Alternar para {{ user.status === "Ativo" ? "Inativo" : "Ativo" }}
    </button>
  </article>
</template>

<script setup lang="ts">
import type { User } from "../types";

defineProps<{
  user: User;
}>();

const emit = defineEmits<{
  (event: "toggle-status", id: string): void;
}>();
</script>