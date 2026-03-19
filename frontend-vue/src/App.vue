<template>
  <div class="page-bg" aria-hidden="true"></div>
  <main class="dashboard">
    <header class="hero">
      <p class="eyebrow">Plataforma Educacional</p>
      <h1>Painel de Usuários</h1>
      <p class="subtitle">
        Acompanhe status, progresso e engajamento dos estudantes em uma interface acessível.
      </p>
    </header>

    <section class="stats-grid" aria-label="Indicadores gerais">
      <StatsCard titulo="Total" :valor="String(totalUsuarios)" descricao="Usuários cadastrados" />
      <StatsCard titulo="Ativos" :valor="String(totalAtivos)" descricao="Ativos no momento" />
      <StatsCard titulo="Média" :valor="`${mediaProgresso}%`" descricao="Progresso médio da turma" />
    </section>

    <section class="controls" aria-label="Filtros de busca">
      <FilterBar
        :search="search"
        :status="statusFiltro"
        @update:search="search = $event"
        @update:status="statusFiltro = $event as StatusFiltro"
        @clear="limparFiltros"
      />
    </section>

    <section class="users-area" aria-live="polite">
      <p class="result-count">{{ usuariosFiltrados.length }} resultado(s)</p>

      <div class="users-grid" role="list">
        <UserCard
          v-for="usuario in usuariosFiltrados"
          :key="usuario.id"
          :user="usuario"
          @toggle-status="alternarStatus"
        />
      </div>

      <p v-if="usuariosFiltrados.length === 0" class="empty-state">
        Nenhum usuário encontrado para os filtros aplicados.
      </p>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import FilterBar from "./components/FilterBar.vue";
import StatsCard from "./components/StatsCard.vue";
import UserCard from "./components/UserCard.vue";
import type { User } from "./types";

type StatusFiltro = "Todos" | "Ativo" | "Inativo";

const users = ref<User[]>([
  {
    id: "u1",
    name: "Ana Mota",
    email: "ana.mota@aluno.edu.br",
    course: "Programação Web",
    progress: 78,
    status: "Ativo"
  },
  {
    id: "u2",
    name: "Bruno Souza",
    email: "bruno.souza@aluno.edu.br",
    course: "Banco de Dados",
    progress: 45,
    status: "Inativo"
  },
  {
    id: "u3",
    name: "Carla Dias",
    email: "carla.dias@aluno.edu.br",
    course: "UX para Educação",
    progress: 92,
    status: "Ativo"
  },
  {
    id: "u4",
    name: "Diego Ramos",
    email: "diego.ramos@aluno.edu.br",
    course: "Introdução a APIs",
    progress: 60,
    status: "Ativo"
  }
]);

const search = ref("");
const statusFiltro = ref<StatusFiltro>("Todos");

const totalUsuarios = computed(() => users.value.length);
const totalAtivos = computed(() => users.value.filter((u) => u.status === "Ativo").length);
const mediaProgresso = computed(() => {
  const soma = users.value.reduce((acc, item) => acc + item.progress, 0);
  return Math.round(soma / users.value.length);
});

const usuariosFiltrados = computed(() => {
  return users.value.filter((u) => {
    const texto = search.value.toLowerCase().trim();
    const matchTexto =
      u.name.toLowerCase().includes(texto) ||
      u.email.toLowerCase().includes(texto) ||
      u.course.toLowerCase().includes(texto);

    const matchStatus = statusFiltro.value === "Todos" || u.status === statusFiltro.value;
    return matchTexto && matchStatus;
  });
});

function alternarStatus(id: string): void {
  users.value = users.value.map((u) => {
    if (u.id !== id) return u;
    return {
      ...u,
      status: u.status === "Ativo" ? "Inativo" : "Ativo"
    };
  });
}

function limparFiltros(): void {
  search.value = "";
  statusFiltro.value = "Todos";
}
</script>