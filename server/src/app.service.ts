import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      count: 3,
      rows: [
        {
          title: 'Trump Impeachment',
          content: 'Hello world, I am Trump!',
        },
        {
          title: 'Trump Impeachment',
          content: 'Hello world, I am Trump!',
        },
        {
          title: 'Trump Impeachment',
          content: 'Hello world, I am Trump!',
        },
      ],
    };
  }
}
