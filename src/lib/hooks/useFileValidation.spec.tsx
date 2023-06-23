import { useFileValidation } from './useFileValidation';
import { customHookRender } from '../../tests/testSetup';
import {
  TextEditorContextProvider,
  TextEditorContextProviderProps,
} from '../components/TextEditorContext/TextEditorContextProvider';

const initialFile: File = {
  type: 'application/pdf',
  size: 2000,
} as File;

const initialContext: TextEditorContextProviderProps = {
  acceptedFormats: ['.pdf', '.png'],
} as TextEditorContextProviderProps;

describe('useFileValidation', () => {
  const setup = (context = initialContext) => {
    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <TextEditorContextProvider {...context}>
        {children}
      </TextEditorContextProvider>
    );
    return customHookRender(() => useFileValidation(), { wrapper: Wrapper });
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('gets an error, when file is not defined', () => {
    const { result } = setup();

    expect(result.current.isFileValid(null)).toBe(false);
  });

  it('gets an error, when file has exceed the size', () => {
    const file = { ...initialFile, size: 200000000 } as File;
    const { result } = setup();

    expect(result.current.isFileValid(file)).toBe(false);
  });

  it('gets an error, when type does not meet conditions', () => {
    const file_1 = { ...initialFile, type: 'application/xlm' } as File;
    const file_2 = { ...initialFile, type: 'image/gif' } as File;
    const file_3 = { ...initialFile, type: 'application/xls' } as File;
    const file_4 = { ...initialFile, type: 'application/js' } as File;
    const file_5 = { ...initialFile, type: 'image/jpg' } as File;

    const { result } = setup();

    expect(result.current.isFileValid(file_1)).toBe(false);
    expect(result.current.isFileValid(file_2)).toBe(false);
    expect(result.current.isFileValid(file_3)).toBe(false);
    expect(result.current.isFileValid(file_4)).toBe(false);
    expect(result.current.isFileValid(file_5)).toBe(false);
  });

  it('does not get an error, when type meets conditions and we declared specific extenstions', () => {
    const file_1 = { ...initialFile, type: 'application/pdf' } as File;
    const file_2 = { ...initialFile, type: 'image/png' } as File;

    const { result } = setup();

    expect(result.current.isFileValid(file_1)).toBe(true);
    expect(result.current.isFileValid(file_2)).toBe(true);
  });

  it('validate format, when we allow all images extenstions', () => {
    const file_1 = { ...initialFile, type: 'application/pdf' } as File;
    const file_2 = { ...initialFile, type: 'image/png' } as File;

    const { result } = setup({
      ...initialContext,
      acceptedFormats: ['image/*'],
    });

    expect(result.current.isFileValid(file_1)).toBe(false);
    expect(result.current.isFileValid(file_2)).toBe(true);
  });

  it('validate format, when we allow all application extenstions', () => {
    const file_1 = { ...initialFile, type: 'application/pdf' } as File;
    const file_2 = { ...initialFile, type: 'image/png' } as File;

    const { result } = setup({
      ...initialContext,
      acceptedFormats: ['application/*'],
    });

    expect(result.current.isFileValid(file_1)).toBe(true);
    expect(result.current.isFileValid(file_2)).toBe(false);
  });

  it('validate format, when we allow all of the extenstionss', () => {
    const file_1 = { ...initialFile, type: 'application/xlm' } as File;
    const file_2 = { ...initialFile, type: 'image/gif' } as File;
    const file_3 = { ...initialFile, type: 'application/xls' } as File;
    const file_4 = { ...initialFile, type: 'application/js' } as File;
    const file_5 = { ...initialFile, type: 'image/jpg' } as File;

    const { result } = setup({
      ...initialContext,
      acceptedFormats: ['*'],
    });

    expect(result.current.isFileValid(file_1)).toBe(true);
    expect(result.current.isFileValid(file_2)).toBe(true);
    expect(result.current.isFileValid(file_3)).toBe(true);
    expect(result.current.isFileValid(file_4)).toBe(true);
    expect(result.current.isFileValid(file_5)).toBe(true);
  });
});
