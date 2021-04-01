<script lang="ts">
    import PlayerSelect from './PlayerSelect.svelte';

    export let onClose: () => void;
    export let onCreate: () => void;

    let winnerId: number;
    let loserId: number;

    function createMatch() {
        fetch('/api/matches', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                winner: winnerId,
                loser: loserId
            })
        }).then(() => {
            onCreate();
            onClose();
        });
    }

    function chooseWinner(e) {
        winnerId = e.detail;
    }

    function chooseLoser(e) {
        loserId = e.detail;
    }
</script>

<div class="modal is-active">
    <form on:submit|preventDefault={createMatch}>
        <div class="modal-background" on:click={onClose} />
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Add New Player</p>
                <button type="button" class="delete" aria-label="close" />
            </header>
            <section class="modal-card-body">
                <PlayerSelect on:select={chooseWinner} />
                <PlayerSelect on:select={chooseLoser} />
            </section>
            <footer class="modal-card-foot">
                <button type="submit" class="button is-success">Submit</button>
                <button type="button" class="button" on:click={onClose}> Cancel </button>
            </footer>
        </div>
    </form>
</div>
