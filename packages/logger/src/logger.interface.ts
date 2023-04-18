export abstract class ILoggerService {
  abstract info(message: string, additionalParams: Record<string, any>): void;

  abstract verbose(
    message: string,
    additionalParams: Record<string, any>,
  ): void;

  abstract log(message: string, additionalParams: Record<string, any>): void;
}
