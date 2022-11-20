import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { SearchOptions } from '../../models';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { SearchParams } from 'src/app/core/models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent<T> implements OnInit, OnDestroy {
  @Input() public items: T[];
  @Input() public searchParams: SearchParams;
  @Input() public options: SearchOptions;
  @Output() public search: EventEmitter<string> = new EventEmitter();
  @Output() public searchName: EventEmitter<string> = new EventEmitter();
  @ViewChild(MatAutocompleteTrigger, { static: false })
  public autocomplete: MatAutocompleteTrigger;

  public searchControl: FormControl = new FormControl('');
  private searchSubject: Subject<string> = new Subject();
  private destroy$: Subject<boolean> = new Subject();

  public ngOnInit(): void {
    this.setOptions();
    this.setSearchParamsEmitting();
    this.setSearchNameParamsEmitting();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public trackByItems(index: number, item: T | any): number {
    return item.id;
  }

  public clearValue(): void {
    this.searchControl.patchValue('');
    this.search.emit('');
  }

  public onSearch(): void {
    let searchValue;
    if (this.autocomplete && this.autocomplete.activeOption) {
      searchValue = this.autocomplete.activeOption.viewValue;
    } else {
      searchValue = this.searchControl.value;
    }
    this.searchSubject.next(searchValue);
  }

  private setOptions(): void {
    const defaultOptions: SearchOptions = {
      name: 'name',
      img: 'img',
      placeholder: 'search',
    };

    this.options = { ...defaultOptions, ...this.options };
    if (this.searchParams) {
      this.searchControl.patchValue(this.searchParams.name_like);
    }
  }

  private setSearchNameParamsEmitting(): void {
    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(500), distinctUntilChanged())
      .subscribe((search: string) => this.searchName.emit(search));
  }

  private setSearchParamsEmitting(): void {
    this.searchSubject
      .pipe(takeUntil(this.destroy$), debounceTime(500), distinctUntilChanged())
      .subscribe((search: string) => {
        this.autocomplete.closePanel();
        this.search.emit(search);
      });
  }
}
