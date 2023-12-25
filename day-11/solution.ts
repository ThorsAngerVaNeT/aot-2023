export type SantaListProtector<Type> = {
  readonly [Property in keyof Type]: Type[Property] extends Record<string, unknown> | unknown[] ? SantaListProtector<Type[Property]> : Type[Property];
}
