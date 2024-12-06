import { LoginForm } from "@/components/auth/login-form"
import { Container } from "@/components/ui/container"

export default function LoginPage() {
  return (
    <Container className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-10">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </Container>
  )
}
