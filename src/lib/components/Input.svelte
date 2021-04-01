<script lang="ts">
    export let placeholder = '';
    export let value;
    export let label;
    export let id;
</script>

<div class="field">
    <label class="label" for={id}>{label}</label>
    <div class="control">
        <input class="input" {id} {placeholder} bind:value />
    </div>
</div>
