<script lang="ts">
    import type { PageData } from "./$types";
    import * as Card from "$components/ui/card";
    import Logo from "$assets/icons/logo.svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
    let email = data.email ?? "name@example.com";
</script>

<div class="flex h-navscreen justify-center bg-background">
    <Card.Root class="mt-12 h-fit max-w-[600px] px-4">
        <Card.Header>
            <div class="flex w-full flex-col items-center">
                <Logo class="h-24 w-24" />
                <h1 class="text-bold font-icon text-3xl font-bold">Please verify your email</h1>
            </div>
        </Card.Header>
        <Card.Content class="text-center">
            <div class="mb-4">
                <p>Almost done! We sent an email to</p>
                <a
                    href="https://mail.google.com/mail/u/0/#inbox"
                    class="font-icon text-lg font-semibold text-primary hover:underline">{email}</a
                >
            </div>
            <div class="mb-4">
                <p class="mb-2">
                    You can click on your email above to open Gmail, which will work for 80% of
                    people according to statistics 🤓☝️. Click on the link in the email to verify
                    your account.
                </p>
                <p>Make sure to check your <b>spam folder</b> too!</p>
            </div>
            <!-- <Button>Resend verification email</Button> -->
        </Card.Content>
    </Card.Root>
</div>
