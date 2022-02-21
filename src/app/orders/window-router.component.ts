import {
  Component,
  ViewChild,
  OnInit,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import {CdkPortal, DomPortalHost} from '@angular/cdk/portal';

/**
 * This component template wrap the projected content
 * with a 'cdkPortal'.
 */

@Component({
  selector: 'window-router',
  template: `
    <ng-container *cdkPortal>
      <ng-content></ng-content>
    </ng-container>
  `
})
export class WindowRouterComponent implements OnInit, AfterViewInit, OnDestroy {

  // STEP 1: get a reference to the portal
  @ViewChild(CdkPortal) portal!: CdkPortal;

  // STEP 2: save a reference to the window so we can close it
  private externalWindow: Window | null = null;

  // STEP 3: Inject all the required dependencies for a PortalHost
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector) {
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
    // STEP 4: create an external window
    this.externalWindow = window.open('', '_blank', 'width=600,height=400,left=200,top=200');

    if (this.externalWindow && this.externalWindow.document) {

      // Copy styles from parent window
      document.querySelectorAll('style').forEach(htmlElement => {
        this.externalWindow?.document.head.appendChild(htmlElement.cloneNode(true));
      });
      // Copy stylesheet link from parent window
      const styleSheetElement = this.getStyleSheetElement();
      this.externalWindow.document.head.appendChild(styleSheetElement);

      this.externalWindow.document.title = "PRODUCT Info";

      this.externalWindow.location.href = window.origin + '/orders/product';

      // STEP 5: create a PortalHost with the body of the new window document
      const host = new DomPortalHost(
        this.externalWindow.document.body,
        this.componentFactoryResolver,
        this.applicationRef,
        this.injector
      );

      // STEP 6: Attach the portal
      host.attach(this.portal);
    }
  }

  getStyleSheetElement() {
    const styleSheetElement = document.createElement('link');
    document.querySelectorAll('link').forEach(htmlElement => {
      if (htmlElement.rel === 'stylesheet') {
        const absoluteUrl = new URL(htmlElement.href).href;
        styleSheetElement.rel = 'stylesheet';
        styleSheetElement.href = absoluteUrl;
      }
    });
    return styleSheetElement;
  }

  ngOnDestroy() {
    // STEP 7: close the window when this component destroyed
    this.externalWindow?.close()
  }
}
