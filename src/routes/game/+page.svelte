<script lang="ts">
</script>

<svelte:head>
  BeatCode - Game
</svelte:head>

<div class="flex overflow-hidden flex-col px-2.5 pt-5 pb-2.5 bg-gray-800">
  <div
    class="flex flex-wrap gap-6 justify-center items-end w-full font-medium whitespace-nowrap max-md:max-w-full"
  >
    <div
      class="flex flex-wrap flex-1 shrink gap-2 items-center basis-0 min-w-[240px] max-md:max-w-full"
    >
      <div
        class="flex shrink-0 self-stretch my-auto rounded-full bg-zinc-300 h-[50px] w-[50px]"
      />
      <div
        class="flex flex-col flex-1 shrink self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full"
      >
        <div class="text-lg leading-loose text-neutral-100 max-md:max-w-full">
          TheWelcomer
        </div>
        <div
          class="flex overflow-hidden flex-col items-start w-full text-sm leading-loose bg-gray-700 rounded-2xl min-h-[20px] text-green-950 max-md:max-w-full"
        >
          <div
            class="overflow-hidden flex-1 gap-2.5 self-stretch p-4 max-w-full h-full bg-emerald-200 rounded-2xl w-[436px]"
          >
            2689
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex gap-0.5 justify-center self-stretch h-full text-base leading-7 text-neutral-100"
    >
      <div
        class="flex overflow-hidden gap-2.5 items-center px-4 py-1 h-full bg-gray-700 rounded-xl"
      >
        <div class="flex gap-1 items-center self-stretch my-auto">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f87236f1b5f31ef31a3631e147e612e67b146593080f01680e35ef883021fe34?placeholderIfAbsent=true&apiKey=bc3d0587a3cd430bad549de1fba2e645"
            class="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
          />
          <div class="self-stretch my-auto">Run</div>
        </div>
      </div>
      <div
        class="flex overflow-hidden gap-2.5 items-center px-4 py-1 h-full bg-gray-700 rounded-none"
      >
        <div class="flex gap-1 items-center self-stretch my-auto">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/07bc44e028ec0b65b0523b235481ccd667cff42b98878071257cf743f853c1d4?placeholderIfAbsent=true&apiKey=bc3d0587a3cd430bad549de1fba2e645"
            class="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
          />
          <div class="self-stretch my-auto">Submit</div>
        </div>
      </div>
    </div>
    <div
      class="flex flex-wrap flex-1 shrink gap-2 items-center basis-0 min-w-[240px] max-md:max-w-full"
    >
      <div
        class="flex flex-col flex-1 shrink self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full"
      >
        <div
          class="text-lg leading-loose text-right text-neutral-100 max-md:max-w-full"
        >
          Weebao
        </div>
        <div
          class="flex overflow-hidden flex-col items-end w-full text-sm leading-loose bg-gray-700 rounded-2xl min-h-[20px] text-red-950 max-md:max-w-full"
        >
          <div
            class="overflow-hidden flex-1 gap-2.5 self-stretch p-4 max-w-full h-full bg-pink-300 rounded-2xl w-[436px]"
          >
            2689
          </div>
        </div>
      </div>
      <div
        class="flex shrink-0 self-stretch my-auto rounded-full bg-zinc-300 h-[50px] w-[50px]"
      />
    </div>
  </div>
  <div class="flex px-0.5 mt-3 w-full max-md:max-w-full">
    <div class="flex flex-wrap flex-auto gap-2 mt-1.5 mr-0 min-h-[926px]">
      <div
        class="flex overflow-hidden flex-col flex-1 shrink text-sm rounded-lg border border-solid basis-0 border-slate-500 min-w-[240px] max-md:max-w-full"
      >
        <div
          class="flex overflow-hidden flex-wrap gap-2 items-center px-4 py-1 w-full font-medium leading-7 whitespace-nowrap bg-gray-700 text-neutral-100 max-md:max-w-full"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5c684fcd5d125783834b471acf67ba04af09a4df1943d7d5d8929486fe6ec1c8?placeholderIfAbsent=true&apiKey=bc3d0587a3cd430bad549de1fba2e645"
            class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
          />
          <div class="self-stretch my-auto">Problem</div>
        </div>
        <div
          class="flex overflow-hidden flex-col flex-1 p-5 w-full max-md:max-w-full"
        >
          <div class="text-2xl font-semibold leading-none text-white">
            1. Two Sum
          </div>
          <div
            class="flex flex-col mt-4 w-full leading-7 text-white max-md:max-w-full"
          >
            <div class="max-md:max-w-full">
              Given an array of integers <span class="">nums</span> and an
              integer <span class="">target</span>, return indices of the two
              numbers such that they add up to target.
            </div>
            <div class="mt-2 italic max-md:max-w-full">
              You may assume that each input would have <span
                class="italic font-extrabold">exactly one solution</span
              >, and you may not use the same element twice.
            </div>
            <div class="mt-2 max-md:max-w-full">
              You can return the answer in any order.
            </div>
          </div>
          <div class="flex flex-col mt-4 w-full max-md:max-w-full">
            <div class="flex flex-col w-full max-md:max-w-full">
              <div class="leading-7 text-white max-md:max-w-full">
                Example 1:
              </div>
              <div
                class="flex flex-wrap gap-2.5 justify-center mt-1 w-full text-white max-md:max-w-full"
              >
                <div
                  class="flex shrink-0 h-12 bg-gray-700 rounded-lg w-[3px]"
                />
                <div class="flex-1 shrink my-auto basis-0 max-md:max-w-full">
                  <span class="font-bold">Input:</span> nums = [2,7,11,15],
                  target = 9 <span class="font-bold">Output:</span> [0,1]
                  <span class="font-bold">Explanation: </span>Because nums[0] +
                  nums[1] == 9, we return [0, 1].
                </div>
              </div>
            </div>
            <div class="flex flex-col mt-2 w-full max-md:max-w-full">
              <div class="leading-7 text-white max-md:max-w-full">
                Example 2:
              </div>
              <div
                class="flex flex-wrap gap-2.5 justify-center mt-1 w-full text-white max-md:max-w-full"
              >
                <div class="flex shrink-0 h-8 bg-gray-700 rounded-lg w-[3px]" />
                <div class="flex-1 shrink my-auto basis-0 max-md:max-w-full">
                  <span class="font-bold">Input:</span> nums = [3,2,4], target =
                  6 <span class="font-bold">Output:</span> [1,2]
                </div>
              </div>
            </div>
            <div class="flex flex-col mt-2 w-full max-md:max-w-full">
              <div class="leading-7 text-white max-md:max-w-full">
                Example 3:
              </div>
              <div
                class="flex flex-wrap gap-2.5 justify-center mt-1 w-full text-white max-md:max-w-full"
              >
                <div class="flex shrink-0 h-8 bg-gray-700 rounded-lg w-[3px]" />
                <div class="flex-1 shrink my-auto basis-0 max-md:max-w-full">
                  <span class="font-bold">Input:</span> nums = [3,3], target = 6
                  <span class="font-bold">Output:</span> [0,1]
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col flex-1 shrink basis-0 min-w-[240px] max-md:max-w-full"
      >
        <div
          class="flex overflow-hidden flex-col flex-1 w-full text-sm rounded-lg border border-solid border-slate-500 max-md:max-w-full"
        >
          <div
            class="flex overflow-hidden flex-wrap gap-2 items-center px-4 py-1 w-full font-medium leading-7 whitespace-nowrap bg-gray-700 text-neutral-100 max-md:max-w-full"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5d1d8ad9b1a0459d1a7ac1d79adf93feed7f6fc286937ac043b8ed69001f3c0?placeholderIfAbsent=true&apiKey=bc3d0587a3cd430bad549de1fba2e645"
              class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
            />
            <div class="self-stretch my-auto">Code</div>
          </div>
          <div
            class="flex flex-wrap flex-1 gap-4 items-start p-3 font-bold bg-neutral-800 size-full max-md:max-w-full"
          >
            <div
              class="flex flex-col items-end text-gray-500 whitespace-nowrap"
            >
              <div class="overflow-hidden px-2.5 py-1">1</div>
              <div class="overflow-hidden px-2.5 py-1">2</div>
              <div class="overflow-hidden px-2.5 py-1">3</div>
              <div class="overflow-hidden px-2.5 py-1">4</div>
              <div class="overflow-hidden px-2.5 py-1">5</div>
              <div class="overflow-hidden px-2.5 py-1">6</div>
              <div class="overflow-hidden px-2.5 py-1">7</div>
              <div class="overflow-hidden px-2.5 py-1 text-slate-300">8</div>
            </div>
            <div
              class="flex flex-col flex-1 shrink basis-0 min-w-[240px] text-slate-300 max-md:max-w-full"
            >
              <div
                class="py-1 w-full rounded text-neutral-300 max-md:max-w-full"
              >
                <span class="text-blue-400">class</span>
                <span class="text-emerald-400">Solution</span><span
                  class="text-neutral-100">:</span
                >
              </div>
              <div
                class="overflow-hidden py-1 w-full bg-rose-300 bg-opacity-20 max-md:max-w-full"
              >
                <span class="text-blue-400">def</span>
                <span class="text-lime-200">solution</span><span
                  class="text-neutral-300">(</span
                ><span class="text-blue-300">self</span><span
                  class="text-neutral-300"
                  >,
                </span><span class="text-blue-300">nums</span><span
                  class="text-neutral-300"
                  >,
                </span><span class="text-blue-300">target</span><span
                  class="text-neutral-300"
                  >):
                </span><span class="text-red-400">deletio</span>
              </div>
              <div class="py-1 w-full rounded max-md:max-w-full">
                hashmap = &123;&125;
              </div>
              <div class="py-1 w-full rounded max-md:max-w-full">
                <span class="text-zinc-400">for</span> i, num
                <span class="text-zinc-400">in</span>
                <span class="text-lime-200">enumerate</span>(nums):
              </div>
              <div class="py-1 w-full rounded max-md:max-w-full">
                diff = target - num
              </div>
              <div class="py-1 w-full rounded max-md:max-w-full">
                <span class="text-zinc-400">if</span> diff
                <span class="text-blue-400">in</span> hashmap:
              </div>
              <div class="py-1 w-full rounded max-md:max-w-full">
                <span class="text-zinc-400">return</span> [hashmap[diff], i]
              </div>
              <div class="py-1 w-full rounded max-md:max-w-full">
                hashmap[num] = i
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex overflow-hidden flex-col mt-3 w-full leading-7 rounded-lg border border-solid border-slate-500 min-h-[361px] max-md:max-w-full"
        >
          <div
            class="flex overflow-hidden flex-wrap gap-2.5 items-center px-4 py-1 w-full text-sm font-medium bg-gray-700 text-slate-500 max-md:max-w-full"
          >
            <div
              class="flex gap-1 items-center self-stretch my-auto whitespace-nowrap"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/af741d1e6bc3378773c3440cdb3cf950b1473128ef85c38e68b2326a2cea8f54?placeholderIfAbsent=true&apiKey=bc3d0587a3cd430bad549de1fba2e645"
                class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              />
              <div class="self-stretch my-auto">Testcase</div>
            </div>
            <div
              class="flex shrink-0 self-stretch my-auto w-px h-5 rounded-lg bg-slate-500"
            />
            <div class="flex gap-1 items-center self-stretch my-auto">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9148e54c59957cd08e197bed2d7d9a197448c700ab72dcc08c281281b7c799d1?placeholderIfAbsent=true&apiKey=bc3d0587a3cd430bad549de1fba2e645"
                class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              />
              <div class="self-stretch my-auto">Test Result</div>
            </div>
            <div
              class="flex shrink-0 self-stretch my-auto w-px h-5 rounded-lg bg-slate-500"
            />
            <div
              class="flex gap-1 items-center self-stretch my-auto whitespace-nowrap text-neutral-100"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4eca3d886822941caa4729a8fa7dd369b4f40426a3ebd600ba48a33abb5452ce?placeholderIfAbsent=true&apiKey=bc3d0587a3cd430bad549de1fba2e645"
                class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              />
              <div class="self-stretch my-auto">Skills</div>
            </div>
            <div
              class="flex shrink-0 self-stretch my-auto w-px h-5 rounded-lg bg-slate-500"
            />
            <div
              class="flex gap-1 items-center self-stretch my-auto whitespace-nowrap"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d1ce74e32850160ad6a359b80b1770c30a07a16f9292de8dd9553dd37d9844fd?placeholderIfAbsent=true&apiKey=bc3d0587a3cd430bad549de1fba2e645"
                class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              />
              <div class="self-stretch my-auto">Chat</div>
            </div>
          </div>
          <div
            class="flex overflow-hidden flex-col flex-1 px-5 pt-6 w-full max-md:max-w-full"
          >
            <div class="flex flex-col w-full max-md:max-w-full">
              <div
                class="gap-2.5 self-start px-2 text-base font-bold whitespace-nowrap bg-pink-300 rounded text-stone-600"
              >
                deletio
              </div>
              <div
                class="flex flex-wrap items-center mt-5 w-full text-sm max-md:max-w-full"
              >
                <div
                  class="flex overflow-hidden flex-col grow shrink self-stretch p-3 my-auto rounded-lg border border-solid border-slate-500 w-[189px]"
                >
                  <div class="text-white">
                    Delete one random line of your opponent’s code
                  </div>
                  <div
                    class="gap-1 self-stretch px-2 py-0.5 mt-4 w-full whitespace-nowrap bg-gray-700 rounded text-neutral-100"
                  >
                    Available
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d6138ad70b126140e43885673f36a24bfca3362e8547f0fb9ae088e41f325982?placeholderIfAbsent=true&apiKey=bc3d0587a3cd430bad549de1fba2e645"
                  class="object-contain shrink-0 self-stretch my-auto aspect-[2.72] stroke-[2px] stroke-slate-500 w-[38px]"
                />
                <div
                  class="flex overflow-hidden flex-col grow shrink self-stretch p-3 my-auto rounded-lg border border-solid border-slate-500 w-[189px]"
                >
                  <div class="text-white">
                    Upgrade to 2 lines of code deleted
                  </div>
                  <div
                    class="gap-1 self-stretch px-2 py-0.5 mt-4 w-full rounded bg-slate-500 text-neutral-100"
                  >
                    Buy: 2 SP
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d6138ad70b126140e43885673f36a24bfca3362e8547f0fb9ae088e41f325982?placeholderIfAbsent=true&apiKey=bc3d0587a3cd430bad549de1fba2e645"
                  class="object-contain shrink-0 self-stretch my-auto aspect-[2.72] stroke-[2px] stroke-slate-500 w-[38px]"
                />
                <div
                  class="flex overflow-hidden flex-col grow shrink self-stretch p-3 my-auto rounded-lg border border-solid border-slate-500 w-[189px]"
                >
                  <div class="text-white">
                    Upgrade to 3 lines of code deleted
                  </div>
                  <div
                    class="gap-1 self-stretch px-2 py-0.5 mt-4 w-full bg-gray-700 rounded text-neutral-100"
                  >
                    Buy: 4 SP
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col mt-10 w-full max-md:max-w-full">
              <div
                class="gap-2.5 self-start px-2 text-base font-bold text-green-400 whitespace-nowrap rounded bg-slate-800"
              >
                syntaxio
              </div>
              <div
                class="flex flex-wrap gap-9 items-center mt-5 w-full text-sm text-white max-md:max-w-full"
              >
                <div
                  class="overflow-hidden grow shrink self-stretch p-3 my-auto rounded-lg border border-solid border-slate-500 w-[157px]"
                >
                  Delete one random line of your opponent’s code
                </div>
                <div
                  class="overflow-hidden grow shrink self-stretch p-3 my-auto rounded-lg border border-solid border-slate-500 w-[157px]"
                >
                  Upgrade to 2 lines of code deleted
                </div>
                <div
                  class="overflow-hidden grow shrink self-stretch p-3 my-auto rounded-lg border border-solid border-slate-500 w-[157px]"
                >
                  Upgrade to 3 lines of code deleted
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="overflow-hidden self-start px-4 py-2.5 text-base font-medium text-black bg-white rounded-xl max-md:pr-5"
    >
      Weebao attacked with deletio 💀
    </div>
  </div>
</div>