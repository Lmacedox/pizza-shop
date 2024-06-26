import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.string().email('E-mail inválido'),
})

type SignInForm = z.infer<typeof signInForm>

export function SingIn() {
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSign({ email }: SignInForm) {
    try {
      await authenticate({ email })

      toast.success('Enviamos um link de autenticação para seu e-mail', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSign({ email }),
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button asChild variant={'ghost'} className="absolute right-8 top-8">
          <Link to={'/sign-up'}>Novo estabelecimento</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel parceiro!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSign)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
