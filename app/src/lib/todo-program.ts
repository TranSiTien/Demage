import { AnchorProvider, IdlAccounts, Program, utils } from "@coral-xyz/anchor";
import { Token2022Staking } from "../../../target/types/token_2022_staking";
import idl from "../../../target/idl/token_2022_staking.json";
import { Cluster, PublicKey, SystemProgram } from "@solana/web3.js";
import { getProgramId, getProvider } from "./helper";

export default class TodoProgram {
  program: Program<Token2022Staking>;
  provider: AnchorProvider;

  constructor(provider: AnchorProvider, cluster: Cluster = "devnet") {
    this.provider = provider;
    this.program = new Program(idl as any, getProvider("devnet"));
  }

  createPool(name: string) {
    const [profile] = PublicKey.findProgramAddressSync(
      [utils.bytes.utf8.encode("pool"), ,
      this.program.programId
    );

    const builder = this.program.methods.createProfile(name).accounts({
      creator: this.provider.publicKey,
      profile,
      systemProgram: SystemProgram.programId,
    });

    return builder.transaction();
  }

  // fetchProfile() {
  //   const [profile] = PublicKey.findProgramAddressSync(
  //     [utils.bytes.utf8.encode("profile"), this.provider.publicKey.toBytes()],
  //     this.program.programId
  //   );

  //   return this.program.account.profile.fetch(profile);
  // }

  // createTodo(content: string, todoIndex: number) {
  //   const [profile] = PublicKey.findProgramAddressSync(
  //     [Buffer.from("profile"), this.provider.publicKey.toBytes()],
  //     this.program.programId
  //   );

  //   const [todo] = PublicKey.findProgramAddressSync(
  //     [Buffer.from("todo"), profile.toBytes(), Buffer.from([todoIndex])],
  //     this.program.programId
  //   );

  //   const builder = this.program.methods.createTodo(content).accounts({
  //     creator: this.provider.publicKey,
  //     profile,
  //     todo,
  //     systemProgram: SystemProgram.programId,
  //   });

  //   return builder.transaction();
  // }

  // async fetchTodos(profile: IdlAccounts<typeof IDL>["profile"]) {
  //   const todoCount = profile.todoCount;

  //   const todoPdas: PublicKey[] = [];

  //   for (let i = 0; i < todoCount; i++) {
  //     const [todo] = PublicKey.findProgramAddressSync(
  //       [Buffer.from("todo"), profile.key.toBytes(), Buffer.from([i])],
  //       this.program.programId
  //     );

  //     todoPdas.push(todo);
  //   }

  //   const todos = await Promise.all(
  //     todoPdas.map((pda) => this.program.account.todo.fetch(pda))
  //   );
  
  //   return todos.map((todo, index) => ({
  //     publicKey: todoPdas[index],
  //     data: todo,
  //   }));
  // }

  // toggleTodoStatus(todo: PublicKey) {
  //   const builder = this.program.methods.toggleTodo().accounts({
  //     creator: this.provider.publicKey,
  //     todo: todo,
  //     systemProgram: SystemProgram.programId,
  //   });
  
  //   return builder.transaction();
  // }
}
