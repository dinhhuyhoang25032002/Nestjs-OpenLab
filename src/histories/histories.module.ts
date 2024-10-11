import { Module } from '@nestjs/common';
import { HistoriesController } from './histories.controller';
import { HistoriesService } from './histories.service';
import { HISTORY_MODEL, HistorySchema } from '@schemas/history.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HISTORY_MODEL,
        schema: HistorySchema
      },
    ])
  ],
  controllers: [HistoriesController],
  providers: [HistoriesService]
})
export class HistoriesModule {}
