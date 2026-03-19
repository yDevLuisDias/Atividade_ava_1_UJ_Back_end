<template>
  <form class="filter-bar" @submit.prevent>
    <div class="field-group">
      <label for="busca">Buscar usuário</label>
      <input
        id="busca"
        type="search"
        :value="search"
        placeholder="Nome, e-mail ou curso"
        @input="emit('update:search', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <div class="field-group">
      <label for="status">Status</label>
      <select
        id="status"
        :value="status"
        @change="emit('update:status', ($event.target as HTMLSelectElement).value)"
      >
        <option value="Todos">Todos</option>
        <option value="Ativo">Ativo</option>
        <option value="Inativo">Inativo</option>
      </select>
    </div>

    <button type="button" class="clear-btn" @click="emit('clear')">
      Limpar filtros
    </button>
  </form>
</template>

<script setup lang="ts">
defineProps<{
  search: string;
  status: string;
}>();

const emit = defineEmits<{
  (event: "update:search", value: string): void;
  (event: "update:status", value: string): void;
  (event: "clear"): void;
}>();
</script>