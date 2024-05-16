import prisma from '../libs/prisma';
import OccurrenceReplyService from '../services/occurrenceReply.service';

export default class OccurrenceReplyController {
  private service: OccurrenceReplyService;

  constructor() {
    this.service = new OccurrenceReplyService(prisma);
  }
}
