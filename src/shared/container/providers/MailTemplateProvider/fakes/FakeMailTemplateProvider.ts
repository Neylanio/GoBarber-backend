import IMailProviderTemplate from "../models/IMailTemplateProvider";
import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";

export default class FakeMailTemplateProvider implements IMailProviderTemplate {
  public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}
