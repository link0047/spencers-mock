<script lang="ts">
  import TextField from "$lib/components/textfield";
  import Button from "$lib/components/button";
  export let data;
  let { supabase } = data;
  $: ({ supabase } = data);

  let email: string;
  let password: string;

  async function handleSignUp() {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
  }
  
  async function handleSignIn() {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
  }
</script>

<form on:submit="{handleSignUp}">
  <TextField name="email" bind:value="{email}" />
  <TextField type="password" name="password" bind:value="{password}" />
  <Button>Sign up</Button>
</form>

<Button on:click="{handleSignIn}">Sign in</Button>
<Button on:click="{handleSignOut}">Sign out</Button>