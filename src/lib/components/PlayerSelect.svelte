<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let players = [];

    onMount(async () => {
        players = await fetch('/api/players').then((res) => res.json());
    });
</script>

<div class="select">
    <select
        on:blur={(e) => {
            dispatch('select', e.target.value);
        }}
    >
        <option />
        {#each players as player}
            <option value={player._id}>{player.name}</option>
        {/each}
    </select>
</div>
