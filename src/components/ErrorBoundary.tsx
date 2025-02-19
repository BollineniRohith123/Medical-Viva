import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    toast({
      title: 'Application Error',
      description: 'An unexpected error occurred. Please try again.',
      variant: 'destructive'
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white p-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Something went wrong
          </h1>
          <p className="mb-6 text-gray-700">
            We're sorry, but an unexpected error occurred.
          </p>
          <div className="flex space-x-4">
            <Button 
              onClick={() => window.location.reload()}
              variant="default"
            >
              Reload Page
            </Button>
            <Button 
              onClick={() => window.history.back()}
              variant="outline"
            >
              Go Back
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
