export abstract class ILoggerService {
  public abstract info(
    message: string,
    additionalParams: Record<string, any>,
  ): void;

  public abstract verbose(
    message: string,
    additionalParams: Record<string, any>,
  ): void;

  public abstract log(
    message: string,
    additionalParams: Record<string, any>,
  ): void;
}
