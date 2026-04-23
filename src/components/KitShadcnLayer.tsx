import { useId } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

/**
 * Same composition as the old page-level shadcn demo, but lives inside a kit column.
 * HSL tokens are scoped in `src/styles/kit-shadcn-scope.css` per panel + kit id.
 */
export function KitShadcnLayer() {
  const headingId = useId()

  return (
    <section className="kit-shadcn-scope" aria-labelledby={headingId}>
      <h4 id={headingId} className="mb-1 text-base font-semibold tracking-tight text-foreground">
        shadcn-style layer
      </h4>
      <p className="mb-3 max-w-prose text-xs leading-relaxed text-muted-foreground">
        Tailwind + <code className="rounded bg-muted px-1 py-0.5 text-[0.65rem]">cn()</code> +{' '}
        <code className="rounded bg-muted px-1 py-0.5 text-[0.65rem]">cva</code> — same stack as{' '}
        <a
          className="font-medium text-primary underline-offset-4 hover:underline"
          href="https://ui.shadcn.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          shadcn/ui
        </a>
        . Primary + ring are tinted for this column.
      </p>
      <div className="grid grid-cols-1 gap-3">
        <Card>
          <CardHeader className="space-y-1 p-4 pb-2">
            <CardTitle className="text-sm">Analyze CTA row</CardTitle>
            <CardDescription className="text-xs">Button variants</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2 p-4 pt-0">
            <Button size="sm">Primary</Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
            <Button size="sm" variant="outline">
              Outline
            </Button>
            <Button size="sm" variant="ghost">
              Ghost
            </Button>
            <Button size="sm" variant="destructive">
              Destructive
            </Button>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2 p-4 pt-0">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="space-y-1 p-4 pb-2">
            <CardTitle className="text-sm">Form field</CardTitle>
            <CardDescription className="text-xs">Input + submit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 p-4 pt-0">
            <Input aria-label="Clip label" placeholder="Clip label (shadcn Input)" />
            <Button className="w-full sm:w-auto" size="sm">
              Run analysis
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
