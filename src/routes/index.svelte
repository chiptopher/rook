<script lang="ts">
    import 'bulma/css/bulma.css';
    import { onMount } from 'svelte';

    import AddMatchModal from '$lib/components/AddMatchModal.svelte';
    import AddPlayerModal from '$lib/components/AddPlayerModal.svelte';
    import { leaderboard } from '$lib/services/leaderboard';

    let addingPlayer = false;
    let addingMatch = false;

    let rankings = [];

    onMount(async () => {
        rankings = await leaderboard();
    });

    function toggleAddPlayer() {
        addingPlayer = !addingPlayer;
    }

    function toggleAddMatch() {
        addingMatch = !addingMatch;
    }

    async function reloadLeaderboard() {
        rankings = await leaderboard();
    }
</script>

<main>
    <h1 class="title">Leaderboard</h1>
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Ranking</th>
                <th>Wins</th>
                <th>Loses</th>
            </tr>
        </thead>
        <tbody>
            {#each rankings as player}
                <tr>
                    <td>{player.name}</td>
                    <td>{player.rank}</td>
                    <td>{player.wins}</td>
                    <td>{player.losses}</td>
                </tr>
            {:else}
                <p>Loading...</p>
            {/each}
        </tbody>
    </table>
    <div class="action-container">
        <button class="button is-primary" on:click={toggleAddPlayer}> Add Player </button>
        <button class="button is-primary" on:click={toggleAddMatch}> Add Match </button>
        <div />
    </div>
    {#if addingPlayer}
        <AddPlayerModal
            onClose={() => {
                addingPlayer = false;
            }}
            onCreate={() => reloadLeaderboard()}
        />
    {/if}
    {#if addingMatch}
        <AddMatchModal
            onClose={() => {
                addingMatch = false;
            }}
            onCreate={() => reloadLeaderboard()}
        />
    {/if}
</main>

<style lang="scss">
    main {
        padding-top: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        max-width: 700px;
        margin: 0 auto;
    }

    .table {
        width: 100%;
    }

    .action-container {
        width: 100%;
        text-align: left;
    }
</style>
