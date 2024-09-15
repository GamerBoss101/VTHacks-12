<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import QuestionSelect from "$lib/components/form/QuestionSelect.svelte";

    let parentDiv;

    onMount(() => {
        let r = new QuestionSelect({
            target: parentDiv,
            props: {
                parentDiv
            }
        });
    });

</script>

<section class="py-5">
    <div class="container py-5">
        <div class="row mb-5" style="padding-bottom: 20px;">
            <div class="col-md-8 col-xl-6 text-center mx-auto">
                <h2 class="fw-bold"><strong><span style="background-color: transparent;">How many questions do you want to answer?</span></strong></h2>
            </div>
        </div>
        <div id="form" class="card" style="padding-top: 20px;padding-bottom: 100px;">
            <div bind:this={parentDiv} class="card-body mx-auto"></div>
        </div>
    </div>
</section>