import Link from "next/link"
import { Container } from "@/components/ui/container"

export function Footer() {
  return (
    <footer className="border-t bg-slate-900/5 backdrop-blur-lg">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 py-4 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-slate-600 md:text-left">
              Built by{" "}
              <Link href="/" className="font-medium underline underline-offset-4">
                Politeknik Kuching Sarawak
              </Link>
              . The source code is available on{" "}
              <Link
                href="https://github.com/wilsonintai76/shiny-enigma"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
