"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">WearAI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link 
            href="/pricing" 
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link 
            href="#how-it-works" 
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How it Works
          </Link>
          <Link 
            href="#" 
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Examples
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Log in
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            <Link 
              href="/pricing" 
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link 
              href="#how-it-works" 
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              How it Works
            </Link>
            <Link 
              href="#" 
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Examples
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="ghost" size="sm" className="justify-start text-muted-foreground">
                Log in
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
