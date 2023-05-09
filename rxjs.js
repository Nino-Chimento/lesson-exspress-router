import {range,filter,map} from 'rxjs';

range(1,2000000000000).pipe(
    filter(x => x % 2 === 1),
    map(x => x + x)
).subscribe({
    next: (x) => console.log(x),
    error: (err) => console.log(err),
    complete: () => console.log("done")
});