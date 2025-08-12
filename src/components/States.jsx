import React from "react";
import {
  Loader2,
  AlertTriangle,
  Search,
  BookOpen,
  RefreshCw,
} from "lucide-react";

export function Spinner({ label = "Loading...", size = "md" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5 sm:h-6 sm:w-6",
    lg: "h-6 w-6 sm:h-8 sm:w-8",
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12 animate-fade-in">
      <div className="relative">
        <Loader2
          className={`animate-spin text-primary-600 ${sizeClasses[size]}`}
        />
        <div className="absolute inset-0 animate-ping">
          <Loader2 className={`text-primary-200 ${sizeClasses[size]}`} />
        </div>
      </div>
      <span className="text-sm text-secondary-600 mt-2 sm:mt-3 font-medium text-center px-4">
        {label}
      </span>
    </div>
  );
}

export function Empty({
  label = "Nothing here yet.",
  description,
  icon: Icon = BookOpen,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 animate-fade-in">
      <div className="p-3 sm:p-4 bg-secondary-100 rounded-full mb-3 sm:mb-4">
        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-secondary-400" />
      </div>
      <h3 className="text-base sm:text-lg font-medium text-secondary-900 mb-2 text-center">
        {label}
      </h3>
      {description && (
        <p className="text-secondary-600 text-center max-w-md mb-4 sm:mb-6 text-sm sm:text-base px-4">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}

export function ErrorState({
  message = "Something went wrong.",
  description,
  onRetry,
  retryLabel = "Try again",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 animate-fade-in">
      <div className="p-3 sm:p-4 bg-error-100 rounded-full mb-3 sm:mb-4">
        <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-error-500" />
      </div>
      <h3 className="text-base sm:text-lg font-medium text-error-900 mb-2 text-center">
        {message}
      </h3>
      {description && (
        <p className="text-error-700 text-center max-w-md mb-4 sm:mb-6 text-sm sm:text-base px-4">
          {description}
        </p>
      )}
      {onRetry && (
        <button onClick={onRetry} className="btn btn-secondary btn-md">
          <RefreshCw className="w-4 h-4 mr-2" />
          {retryLabel}
        </button>
      )}
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="card p-4 sm:p-6 animate-pulse">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="p-2 sm:p-3 bg-secondary-200 rounded-lg w-10 h-10 sm:w-12 sm:h-12"></div>
        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-secondary-200 rounded"></div>
      </div>
      <div className="space-y-2 sm:space-y-3">
        <div className="h-4 sm:h-5 bg-secondary-200 rounded w-3/4"></div>
        <div className="h-3 sm:h-4 bg-secondary-200 rounded w-full"></div>
        <div className="h-3 sm:h-4 bg-secondary-200 rounded w-2/3"></div>
      </div>
      <div className="mt-4 sm:mt-6 space-y-2">
        <div className="h-3 sm:h-4 bg-secondary-200 rounded w-1/2"></div>
        <div className="h-3 sm:h-4 bg-secondary-200 rounded w-1/3"></div>
      </div>
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-secondary-200">
        <div className="flex items-center justify-between">
          <div className="h-5 sm:h-6 bg-secondary-200 rounded-full w-14 sm:w-16"></div>
          <div className="h-3 sm:h-4 bg-secondary-200 rounded w-16 sm:w-20"></div>
        </div>
      </div>
    </div>
  );
}

export function SearchEmpty({ query, onClear }) {
  return (
    <Empty
      icon={Search}
      label={`No results found for "${query}"`}
      description="Try adjusting your search terms or browse all available courses."
      action={
        onClear && (
          <button onClick={onClear} className="btn btn-secondary btn-md">
            Clear search
          </button>
        )
      }
    />
  );
}
