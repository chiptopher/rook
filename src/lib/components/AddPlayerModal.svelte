<script lang="ts">
    import Input from './Input.svelte';

    export let onClose: () => void;
    export let onCreate: () => void;

    let name;

    function createPlayer() {
        fetch('/api/players', {
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                name
            })
        }).then(() => {
            onCreate();
            onClose();
        });
    }
</script>

<div class="modal is-active">
    <form on:submit|preventDefault={createPlayer}>
        <div class="modal-background" on:click={onClose} />
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Add New Player</p>
                <button type="button" class="delete" aria-label="close" />
            </header>
            <section class="modal-card-body">
                <Input label="Name" bind:value={name} />
            </section>
            <footer class="modal-card-foot">
                <button type="submit" class="button is-success">Submit</button>
                <button type="button" class="button" on:click={onClose}> Cancel </button>
            </footer>
        </div>
    </form>
</div>
