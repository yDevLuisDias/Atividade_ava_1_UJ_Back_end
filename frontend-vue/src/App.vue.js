import { computed, ref } from "vue";
import FilterBar from "./components/FilterBar.vue";
import StatsCard from "./components/StatsCard.vue";
import UserCard from "./components/UserCard.vue";
const users = ref([
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
const statusFiltro = ref("Todos");
const totalUsuarios = computed(() => users.value.length);
const totalAtivos = computed(() => users.value.filter((u) => u.status === "Ativo").length);
const mediaProgresso = computed(() => {
    const soma = users.value.reduce((acc, item) => acc + item.progress, 0);
    return Math.round(soma / users.value.length);
});
const usuariosFiltrados = computed(() => {
    return users.value.filter((u) => {
        const texto = search.value.toLowerCase().trim();
        const matchTexto = u.name.toLowerCase().includes(texto) ||
            u.email.toLowerCase().includes(texto) ||
            u.course.toLowerCase().includes(texto);
        const matchStatus = statusFiltro.value === "Todos" || u.status === statusFiltro.value;
        return matchTexto && matchStatus;
    });
});
function alternarStatus(id) {
    users.value = users.value.map((u) => {
        if (u.id !== id)
            return u;
        return {
            ...u,
            status: u.status === "Ativo" ? "Inativo" : "Ativo"
        };
    });
}
function limparFiltros() {
    search.value = "";
    statusFiltro.value = "Todos";
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-bg" },
    'aria-hidden': "true",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: "dashboard" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "hero" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "eyebrow" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "subtitle" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "stats-grid" },
    'aria-label': "Indicadores gerais",
});
/** @type {[typeof StatsCard, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(StatsCard, new StatsCard({
    titulo: "Total",
    valor: (String(__VLS_ctx.totalUsuarios)),
    descricao: "Usuários cadastrados",
}));
const __VLS_1 = __VLS_0({
    titulo: "Total",
    valor: (String(__VLS_ctx.totalUsuarios)),
    descricao: "Usuários cadastrados",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {[typeof StatsCard, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(StatsCard, new StatsCard({
    titulo: "Ativos",
    valor: (String(__VLS_ctx.totalAtivos)),
    descricao: "Ativos no momento",
}));
const __VLS_4 = __VLS_3({
    titulo: "Ativos",
    valor: (String(__VLS_ctx.totalAtivos)),
    descricao: "Ativos no momento",
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
/** @type {[typeof StatsCard, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(StatsCard, new StatsCard({
    titulo: "Média",
    valor: (`${__VLS_ctx.mediaProgresso}%`),
    descricao: "Progresso médio da turma",
}));
const __VLS_7 = __VLS_6({
    titulo: "Média",
    valor: (`${__VLS_ctx.mediaProgresso}%`),
    descricao: "Progresso médio da turma",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "controls" },
    'aria-label': "Filtros de busca",
});
/** @type {[typeof FilterBar, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(FilterBar, new FilterBar({
    ...{ 'onUpdate:search': {} },
    ...{ 'onUpdate:status': {} },
    ...{ 'onClear': {} },
    search: (__VLS_ctx.search),
    status: (__VLS_ctx.statusFiltro),
}));
const __VLS_10 = __VLS_9({
    ...{ 'onUpdate:search': {} },
    ...{ 'onUpdate:status': {} },
    ...{ 'onClear': {} },
    search: (__VLS_ctx.search),
    status: (__VLS_ctx.statusFiltro),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    'onUpdate:search': (...[$event]) => {
        __VLS_ctx.search = $event;
    }
};
const __VLS_16 = {
    'onUpdate:status': (...[$event]) => {
        __VLS_ctx.statusFiltro = $event;
    }
};
const __VLS_17 = {
    onClear: (__VLS_ctx.limparFiltros)
};
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "users-area" },
    'aria-live': "polite",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "result-count" },
});
(__VLS_ctx.usuariosFiltrados.length);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "users-grid" },
    role: "list",
});
for (const [usuario] of __VLS_getVForSourceType((__VLS_ctx.usuariosFiltrados))) {
    /** @type {[typeof UserCard, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(UserCard, new UserCard({
        ...{ 'onToggleStatus': {} },
        key: (usuario.id),
        user: (usuario),
    }));
    const __VLS_19 = __VLS_18({
        ...{ 'onToggleStatus': {} },
        key: (usuario.id),
        user: (usuario),
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    let __VLS_21;
    let __VLS_22;
    let __VLS_23;
    const __VLS_24 = {
        onToggleStatus: (__VLS_ctx.alternarStatus)
    };
    var __VLS_20;
}
if (__VLS_ctx.usuariosFiltrados.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "empty-state" },
    });
}
/** @type {__VLS_StyleScopedClasses['page-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard']} */ ;
/** @type {__VLS_StyleScopedClasses['hero']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['controls']} */ ;
/** @type {__VLS_StyleScopedClasses['users-area']} */ ;
/** @type {__VLS_StyleScopedClasses['result-count']} */ ;
/** @type {__VLS_StyleScopedClasses['users-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            FilterBar: FilterBar,
            StatsCard: StatsCard,
            UserCard: UserCard,
            search: search,
            statusFiltro: statusFiltro,
            totalUsuarios: totalUsuarios,
            totalAtivos: totalAtivos,
            mediaProgresso: mediaProgresso,
            usuariosFiltrados: usuariosFiltrados,
            alternarStatus: alternarStatus,
            limparFiltros: limparFiltros,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
