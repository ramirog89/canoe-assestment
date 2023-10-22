import React from 'react';

export type Provider = React.JSXElementConstructor<
  React.PropsWithChildren<any>
>;

interface IComposeProps {
  providers: Provider[];
  children: React.ReactNode;
  state?: {[key: string]: {initialState: any}};
}

export const ComposeProvider = ({
  providers = [],
  children,
  state = {},
}: IComposeProps) => {
  return (
    <>
      {providers.reduceRight((acc, Comp) => {
        const providerName = Comp.name;
        const initialState = state[providerName]?.initialState || {};
        return <Comp initialState={initialState}>{acc}</Comp>;
      }, children)}
    </>
  );
};
