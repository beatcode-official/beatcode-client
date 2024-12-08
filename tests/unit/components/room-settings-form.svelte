<script lang="ts">
    import { onMount } from "svelte";
    import { RoomSettingsForm } from "$components/game/room";
    import { superForm, type Infer, type SuperForm } from "sveltekit-superforms";
    import { RoomSettingsSchema } from "$lib/models/room";

    // interface Props {
    //     form: SuperForm<Infer<typeof RoomSettingsSchema>>
    // }

    // let { form }: Props = $props();
    let form: SuperForm<Infer<typeof RoomSettingsSchema>>;
    onMount(() => {
        form = superForm<Infer<typeof RoomSettingsSchema>>({
            problem_count: 10,
            starting_hp: 100,
            base_hp_deduction: 5,
            hp_multiplier_easy: 1.0,
            hp_multiplier_medium: 1.5,
            hp_multiplier_hard: 2.0,
            distribution_mode: "auto",
            prob_easy: 0.5,
            prob_medium: 0.3,
            prob_hard: 0.2,
            starting_sp: 50,
            starting_mp: 30,
            mana_recharge: 10
        });
    });
</script>

{#if form}
    <RoomSettingsForm {form} action="?/submit">
        <button data-testid="room-settings-submit-btn">Submit</button>
    </RoomSettingsForm>
{/if}

<style>
</style>
