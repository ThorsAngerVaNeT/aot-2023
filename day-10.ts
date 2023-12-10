type StreetSuffixTester<T extends string, Key extends string> = T extends `${string}${Key}` ? true : false;
