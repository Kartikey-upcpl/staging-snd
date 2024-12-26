'use client'

import { classnames } from '@/utlis/classnames';
import React from 'react';
import {
  useClearRefinements,
  UseClearRefinementsProps,
} from 'react-instantsearch';

export default function CustomButtonClearAll(props: UseClearRefinementsProps) {
  const { canRefine, refine } = useClearRefinements(props);

  return (
    <button
      onClick={canRefine ? refine : undefined}
      className={classnames(
        `btn btn-primary js-open-aside !mt-5`,
        {
          "disabled": !canRefine
        }
      )}
    >
      Clear all
    </button>
  );
}