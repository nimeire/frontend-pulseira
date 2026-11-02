import { createContext } from 'react';

/**
 * `caixa`: campo em caixa com ícone (perfil, dashboards).
 * `linha`: só uma linha embaixo, rótulo pequeno em caixa alta (login e cadastro).
 */
export type VarianteCampo = 'caixa' | 'linha';

export const VarianteCampoContext = createContext<VarianteCampo>('caixa');
