declare module "*.scss" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }

  interface Global {
    fetch: any;
  }
}
