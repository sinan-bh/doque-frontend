export default function HandleLoading({
  loading,
  error,
  loadingComponent = <p>Loading...</p>,
  errorComponent = <p className="text-red-700">Error, {error}</p>,
  children,
}: {
  children: React.ReactNode;
  loading: boolean;
  error: string | null;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
}) {
  if (loading) {
    return loadingComponent;
  }
  if (error) {
    return errorComponent;
  }
  return <>{children}</>;
}
