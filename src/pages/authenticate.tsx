import { supabase } from '#/lib/supabase'

const Authenticate = () => {
  const handleGoogleSignIn = async () => {
    await supabase.auth.signIn({
      provider: 'google'
    })
  }

  return (
    <div>
      <button type="button" onClick={handleGoogleSignIn}>
        Entrar com Google
      </button>
    </div>
  )
}

export default Authenticate
