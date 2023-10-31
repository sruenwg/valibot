import type { BaseSchemaAsync, ErrorMessage } from '../../types.ts';
import { getSchemaIssues, getOutput } from '../../utils/index.ts';
import type { PicklistOptions } from './types.ts';

/**
 * Picklist schema async type.
 */
export type PicklistSchemaAsync<
  TOptions extends PicklistOptions,
  TOutput = TOptions[number]
> = BaseSchemaAsync<TOptions[number], TOutput> & {
  type: 'picklist';
  /**
   * The picklist value.
   */
  options: TOptions;
};

/**
 * Creates an async picklist schema.
 *
 * @param options The picklist options.
 * @param error The error message.
 *
 * @returns An async picklist schema.
 */
export function picklistAsync<
  TOption extends string,
  TOptions extends PicklistOptions<TOption>
>(options: TOptions, error?: ErrorMessage): PicklistSchemaAsync<TOptions> {
  return {
    type: 'picklist',
    async: true,
    options,
    async _parse(input, info) {
      // Check type of input
      if (!options.includes(input as any)) {
        return getSchemaIssues(
          info,
          'type',
          'picklist',
          error || 'Invalid type',
          input
        );
      }

      // Return inpot as output
      return getOutput(input as TOptions[number]);
    },
  };
}

/**
 * See {@link picklistAsync}
 *
 * @deprecated Use `picklistAsync` instead.
 */
export const enumTypeAsync = picklistAsync;
