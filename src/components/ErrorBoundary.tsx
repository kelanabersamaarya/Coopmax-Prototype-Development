"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, RotateCcw } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

type State = {
  error: Error | null;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    // Keep console error for debugging in Dyad.
    console.error(error);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-[hsl(var(--app-bg))] px-4 py-10">
          <div className="mx-auto w-full max-w-2xl">
            <Card className="rounded-3xl border-slate-200/70 bg-white/90 p-6 shadow-sm backdrop-blur md:p-8">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 ring-1 ring-amber-200">
                  <AlertTriangle className="h-6 w-6" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-lg font-extrabold tracking-tight text-slate-900">
                    Terjadi error di halaman ini
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    Silakan refresh. Jika masih terjadi, kirim pesan error di bawah
                    ini.
                  </div>

                  <div className="mt-4 overflow-hidden rounded-2xl bg-slate-900 p-4 text-xs text-slate-100">
                    <div className="font-semibold">Error</div>
                    <div className="mt-2 whitespace-pre-wrap break-words opacity-90">
                      {this.state.error.message}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <Button
                      onClick={() => window.location.reload()}
                      className="rounded-full bg-[hsl(var(--app-accent))] text-white hover:bg-[hsl(var(--app-accent-2))]"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Refresh
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => this.setState({ error: null })}
                      className="rounded-full border-slate-200 bg-white/60 hover:bg-white"
                    >
                      Coba lanjut
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}