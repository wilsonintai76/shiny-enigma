import { SignUpForm } from "@/components/auth/signup-form"
import { Container } from "@/components/ui/container"

export default function SignUpPage() {
  return (
    <Container className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-10">
      <div className="w-full max-w-md">
        <SignUpForm />
      </div>
    </Container>
  )
}
