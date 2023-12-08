type RemoveNaughtyChildren<List> = Omit<List, `naughty_${string}`>
